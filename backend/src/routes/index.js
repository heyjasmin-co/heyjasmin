import userRoutes from './users/index.js'
import paymentRoutes from './payments/index.js'
import stripeWebhook from './webhooks/stripe.js'
import clerkWebhook from './webhooks/clerk.js'

export default async function routes(fastify) {
	fastify.get(
		'/',
		{
			schema: {
				tags: ['general'],
				description: 'API root endpoint',
				response: {
					200: {
						type: 'object',
						properties: {
							message: { type: 'string' },
							version: { type: 'string' },
						},
					},
				},
			},
		},
		async () => {
			return {
				message: 'Fastify API with Mongoose, Stripe, Clerk, and Zod',
				version: '1.0.0',
			}
		}
	)

	fastify.get(
		'/health',
		{
			schema: {
				tags: ['general'],
				description: 'Health check endpoint',
				response: {
					200: {
						type: 'object',
						properties: {
							status: { type: 'string' },
							timestamp: { type: 'string' },
							database: { type: 'string' },
						},
					},
				},
			},
		},
		async () => {
			return {
				status: 'ok',
				timestamp: new Date().toISOString(),
				database: fastify.mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
			}
		}
	)

	await fastify.register(userRoutes, { prefix: '/api/v1/users' })
	await fastify.register(paymentRoutes, { prefix: '/api/v1/payments' })
	await fastify.register(stripeWebhook, { prefix: '/api/v1/webhooks-stripe' })
	await fastify.register(clerkWebhook, { prefix: '/api/v1/webhooks-clerk' })
}
