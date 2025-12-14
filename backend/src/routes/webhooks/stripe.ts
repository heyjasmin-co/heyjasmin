import { FastifyInstance } from 'fastify'
import Stripe from 'stripe'
import config from '../../config/index'
import stripe from '../../config/stripe'
import { handleSubscriptionCanceled, handleSubscriptionRenewed } from '../../services/stripe.service'

export default async function stripeWebhook(fastify: FastifyInstance) {
	fastify.post(
		'/',
		{
			config: {
				rawBody: true,
			},
			schema: {
				tags: ['webhooks'],
				description: 'Stripe webhook endpoint',
				hide: true,
			},
		},
		async (request, reply) => {
			const sig = request.headers['stripe-signature']
			let event
			if (!sig) return
			try {
				const rawBody = (request as any).rawBody || request.body
				event = stripe.webhooks.constructEvent(rawBody, sig, config.STRIPE_WEBHOOK_SECRET!)
			} catch (err: any) {
				fastify.log.error(`Webhook signature verification failed: ${err.message}`)
				return reply.code(400).send({ error: 'Webhook signature verification failed' })
			}

			fastify.log.info(`Received Stripe event: ${event.type}`)

			try {
				switch (event.type) {
					// Run when subscription is canceled or ended (deleted)
					case 'customer.subscription.deleted':
						fastify.log.info('Subscription deleted: subscription canceled or ended')
						return await handleSubscriptionCanceled(event.data.object as Stripe.Subscription, fastify)

					// Run when an invoice payment succeeds (including renewals)
					case 'invoice.payment_succeeded':
						fastify.log.info('Invoice payment succeeded')
						const invoice = event.data.object as Stripe.Invoice
						if (event.data.object.billing_reason === 'subscription_cycle') {
							fastify.log.info('Subscription renewal invoice paid')
							return await handleSubscriptionRenewed(invoice, fastify)
						}
						break

					default:
						fastify.log.info(`Unhandled event type: ${event.type}`)
				}

				return reply.code(200).send({ received: true })
			} catch (error: any) {
				fastify.log.error(`Error processing webhook: ${error.message}`)
				return reply.code(500).send({ error: 'Webhook processing failed' })
			}
		}
	)
}
