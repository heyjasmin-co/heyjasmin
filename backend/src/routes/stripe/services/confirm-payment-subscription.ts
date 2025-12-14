import { FastifyRequest } from 'fastify'
import stripe from '../../../config/stripe'
import { Business } from '../../../models'
import { Trial } from '../../../models/Trial'
import { createBusinessPlan } from '../../../services/businessPlan.service'
import { runTransaction } from '../../../utils/transaction'
import { ConfirmPaymentSubscriptionInput, ConfirmPaymentSubscriptionOutput } from './types'

export const confirmPaymentSubscription = async (
	request: FastifyRequest,
	args: ConfirmPaymentSubscriptionInput
): Promise<ConfirmPaymentSubscriptionOutput> => {
	const { setupIntentId, businessId, priceId } = args

	if (!priceId) {
		throw new Error('Price ID is required to create subscription')
	}

	if (!setupIntentId) {
		throw new Error('Setup Intent is required')
	}

	// Retrieve the setup intent to get payment method
	const [retrievedSetupIntent, business] = await Promise.all([
		stripe.setupIntents.retrieve(setupIntentId, {
			expand: ['payment_method'], // Expand to get payment method details
		}),
		Business.findById(businessId).populate<{
			ownerUserId: { email: string; clerkId: string }
		}>('ownerUserId', 'email clerkId'),
	])

	if (!business) {
		throw new Error('Business not found')
	}
	if (retrievedSetupIntent.status !== 'succeeded') {
		throw new Error('Payment method not confirmed')
	}

	const paymentMethod = retrievedSetupIntent.payment_method as any
	const paymentMethodId = paymentMethod?.id

	if (!paymentMethodId) {
		throw new Error('Payment method not found')
	}

	let customerId: string
	let subscriptionId: string

	await runTransaction(async (session) => {
		const ownerEmail = business.ownerUserId?.email

		// Check if customer already exists for this business
		customerId = business.stripeCustomerId || ''

		if (!customerId) {
			// Create new customer
			const customer = await stripe.customers.create({
				email: ownerEmail,
				name: business.name,
				metadata: {
					businessId: businessId.toString(),
					clerkUserId: business.ownerUserId?.clerkId || '',
				},
			})
			customerId = customer.id

			// Save customer ID to business
			business.stripeCustomerId = customer.id
			await business.save({ session })

			request.log.info({ customerId, businessId }, '✅ New customer created')
		}

		// Attach payment method to customer
		try {
			// First, check if payment method is already attached to another customer
			if (paymentMethod.customer && paymentMethod.customer !== customerId) {
				// Detach from previous customer first
				await stripe.paymentMethods.detach(paymentMethodId)
			}

			// Attach to current customer
			await stripe.paymentMethods.attach(paymentMethodId, {
				customer: customerId,
			})

			// Set as default payment method
			await stripe.customers.update(customerId, {
				invoice_settings: {
					default_payment_method: paymentMethodId,
				},
			})

			request.log.info({ customerId, paymentMethodId }, '✅ Payment method attached to customer')
		} catch (error: any) {
			// Payment method might already be attached
			if (error.code === 'resource_already_exists') {
				request.log.info({ customerId, paymentMethodId }, 'Payment method already attached')

				// Verify it's attached to the correct customer
				const paymentMethodDetails = await stripe.paymentMethods.retrieve(paymentMethodId)
				if (paymentMethodDetails.customer !== customerId) {
					throw new Error(`Payment method attached to different customer: ${paymentMethodDetails.customer}`)
				}

				// Just update the default payment method
				await stripe.customers.update(customerId, {
					invoice_settings: {
						default_payment_method: paymentMethodId,
					},
				})
			} else {
				throw error
			}
		}

		// Get existing subscription if any
		const existingSubscriptions = await stripe.subscriptions.list({
			customer: customerId,
			status: 'active',
			limit: 1,
		})

		let stripeSubscription
		if (existingSubscriptions.data.length > 0) {
			stripeSubscription = existingSubscriptions.data[0]
		}

		if (stripeSubscription) {
			const currentStripeInterval = stripeSubscription.items.data[0].plan.interval
			const currentPlanInterval = 'month' // Replace with your logic

			if (currentStripeInterval === currentPlanInterval) {
				// Update subscription
				const updateParams: any = {
					items: [{ id: stripeSubscription.items.data[0].id, price: priceId, quantity: 1 }],
					proration_behavior: 'always_invoice',
					expand: ['latest_invoice.payment_intent'],
				}

				// Only add default_payment_method if it's different
				if (stripeSubscription.default_payment_method !== paymentMethodId) {
					updateParams.default_payment_method = paymentMethodId
				}

				const updatedSubscription = await stripe.subscriptions.update(stripeSubscription.id, updateParams)
				stripeSubscription = updatedSubscription
				request.log.info({ subscriptionId: stripeSubscription.id }, '✅ Subscription updated')
			} else {
				// Cancel and create new subscription
				await stripe.subscriptions.cancel(stripeSubscription.id)
				request.log.info({ subscriptionId: stripeSubscription.id }, '🛑 Old subscription canceled')

				const newSubscription = await stripe.subscriptions.create({
					customer: customerId,
					items: [{ price: priceId }],
					expand: ['latest_invoice.payment_intent'],
				})
				stripeSubscription = newSubscription
				request.log.info({ subscriptionId: newSubscription.id }, '✅ New subscription created')
			}
		} else {
			// No subscription exists → create new
			const newSubscription = await stripe.subscriptions.create({
				customer: customerId,
				items: [{ price: priceId }],
				expand: ['latest_invoice.payment_intent'],
			})
			stripeSubscription = newSubscription

			// End trial if active
			await Trial.updateOne(
				{ businessId: business._id, trialStatus: 'trial_active' },
				{
					$set: {
						trialEndDate: new Date(),
						trialStatus: 'trial_ended',
					},
				},
				{
					session,
				}
			)
			request.log.info({ subscriptionId: newSubscription.id }, '✅ Subscription created')
		}

		// Create or update business plan
		await createBusinessPlan(
			{
				businessId,
				customerId,
				subscriptionId: stripeSubscription.id,
				priceId,
			},
			session
		)

		request.log.info(
			{
				businessId,
				subscriptionId: stripeSubscription.id,
				customerId,
			},
			'✅ Subscription created successfully'
		)
	})

	return priceId
}
