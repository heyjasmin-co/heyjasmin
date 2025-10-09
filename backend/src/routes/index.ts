import { FastifyInstance } from 'fastify'
import websiteScrapeRoutes from './scrape-website'
import userRoutes from './users/index'
import clerkWebhook from './webhooks/clerk'
import stripeWebhook from './webhooks/stripe'

export default async function routes(fastify: FastifyInstance) {
	fastify.get(
		'/',

		() => {
			return {
				message: 'Working',
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
	await fastify.register(stripeWebhook, { prefix: '/api/v1/webhooks-stripe' })
	await fastify.register(clerkWebhook, { prefix: '/api/v1/webhooks-clerk' })
	await fastify.register(websiteScrapeRoutes, { prefix: '/api/v1/scrape' })
}
