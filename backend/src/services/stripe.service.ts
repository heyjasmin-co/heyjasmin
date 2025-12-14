import { FastifyInstance } from 'fastify'
import Stripe from 'stripe'

import stripe from '../config/stripe'
import { Business } from '../models/Business'
import { BusinessPlan } from '../models/BusinessPlan'
import { runTransaction } from '../utils/transaction'
import { linkTwilioNumberToAIAssistant, unlinkTwilioNumberFromAIAssistant } from './vapi.service'

export async function handleSubscriptionRenewed(invoice: Stripe.Invoice, fastify: FastifyInstance) {
	const subscriptionId = invoice.subscription as string
	if (!subscriptionId) return

	const subscription = await stripe.subscriptions.retrieve(subscriptionId)

	fastify.log.info(`🔁 Subscription renewed: ${subscription.id}`)
	await runTransaction(async (session) => {
		const businessPlan = await BusinessPlan.findOneAndUpdate(
			{ stripeSubscriptionId: subscription.id },
			{
				$set: {
					subscriptionStatus: 'active',
					subscriptionEndDate: new Date(subscription.current_period_end * 1000),
				},
			},
			{ new: true, session }
		)
		if (!businessPlan) {
			fastify.log.warn(`⚠️ No BusinessPlan found for ${subscription.id}`)
			return
		}

		// 2️⃣ Load business
		const business = await Business.findById(businessPlan.businessId)

		if (!business) {
			fastify.log.warn(`⚠️ Business not found for plan ${businessPlan._id}`)
			return
		}
		business.totalCallMinutes = 0
		// 3️⃣ Unlink Twilio number safely
		if (
			business.aiAgentSettings &&
			business.aiAgentSettings?.twilioNumber &&
			business.aiAgentSettings?.assistantId &&
			!business.aiAgentSettings.assistantPhoneNumberId
		) {
			try {
				const response = await linkTwilioNumberToAIAssistant({
					businessName: business.name,
					assistantId: business.aiAgentSettings.assistantId!,
					mobileNumber: business.aiAgentSettings.twilioNumber!,
				})
				business.aiAgentSettings.assistantPhoneNumberId = response.id
				fastify.log.info(`📞 Twilio number unlinked for ${business.name}`)
			} catch (error: any) {
				fastify.log.error(`❌ Failed to unlink Twilio for ${business.name}: ${error.message}`)
			}
		}

		await business.save({ session })
	})

	fastify.log.info(`✅ Subscription extended`)
}

export async function handleSubscriptionCanceled(subscription: Stripe.Subscription, fastify: FastifyInstance) {
	fastify.log.info(`🛑 Subscription canceled: ${subscription.id}`)

	await runTransaction(async (session) => {
		// 1️⃣ Find business plan
		const businessPlan = await BusinessPlan.findOneAndUpdate(
			{ stripeSubscriptionId: subscription.id },
			{
				$set: {
					subscriptionStatus: 'inactive',
					subscriptionEndDate: new Date(),
				},
			},
			{ new: true, session }
		)

		if (!businessPlan) {
			fastify.log.warn(`⚠️ No BusinessPlan found for ${subscription.id}`)
			return
		}

		// 2️⃣ Load business
		const business = await Business.findById(businessPlan.businessId)

		if (!business) {
			fastify.log.warn(`⚠️ Business not found for plan ${businessPlan._id}`)
			return
		}

		// 3️⃣ Unlink Twilio number safely
		if (business.aiAgentSettings && business.aiAgentSettings?.twilioNumber && business.aiAgentSettings?.assistantId) {
			try {
				await unlinkTwilioNumberFromAIAssistant({
					mobileNumber: business.aiAgentSettings.twilioNumber,
					assistantId: business.aiAgentSettings.assistantId,
					businessName: business.name,
				})
				business.aiAgentSettings.assistantPhoneNumberId = null
				await business.save({ session })
				fastify.log.info(`📞 Twilio number unlinked for ${business.name}`)
			} catch (error: any) {
				fastify.log.error(`❌ Failed to unlink Twilio for ${business.name}: ${error.message}`)
			}
		}
	})

	fastify.log.info(`✅ Subscription fully deactivated`)
}
