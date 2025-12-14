import { FastifyInstance } from 'fastify'
import { createContext } from '../../context'
import { authenticate } from '../../middleware/clerkAuth'
import { confirmPaymentSubscriptionHandler } from './handlers/confirm-payment-subscription'
import { createPaymentIntentHandler } from './handlers/create-payment-intent'
import { confirmPaymentSubscriptionSchema, createPaymentIntentBodySchema } from './handlers/types'

export default async function stripeRoute(fastify: FastifyInstance) {
	// ------------------ Create Payment Intent ------------------
	fastify.post('/create', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['stripe-payment-intents'],
			description: 'Create a new Stripe Payment Intent',
			body: createPaymentIntentBodySchema,
		},
		handler: createPaymentIntentHandler,
	})

	// ------------------ Confirm Payment Subscription ------------------
	fastify.post('/confirm', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['stripe-subscriptions'],
			description: 'Confirm payment and create subscription for a business',
			body: confirmPaymentSubscriptionSchema,
		},
		handler: confirmPaymentSubscriptionHandler,
	})
}
