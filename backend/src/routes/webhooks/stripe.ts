import { FastifyInstance } from 'fastify'
import Stripe from 'stripe'
import config from '../../config/index'
import stripe from '../../config/stripe'

export default async function stripeWebhook(fastify: FastifyInstance) {
	fastify.post(
		'/stripe',
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
					case 'customer.subscription.created':
					case 'customer.subscription.updated':
						await handleSubscriptionUpdate(event.data.object, fastify)
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

async function handleSubscriptionUpdate(subscription: Stripe.Subscription, fastify: FastifyInstance) {
	fastify.log.info(`Subscription updated: ${subscription.id}`)
}
