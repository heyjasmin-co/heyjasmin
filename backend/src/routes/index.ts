import { FastifyInstance } from 'fastify'
import businessUserInvitationsRoute from './business-user-invitations'
import businessUsersRoute from './business-users'
import businessRoute from './businesses'
import callRoute from './calls'
import websiteScrapeRoutes from './scrape-website'
import stripeRoute from './stripe'
import superAdminRoutes from './super-admin'
import userRoutes from './users/index'
import clerkWebhook from './webhooks/clerk'
import stripeWebhook from './webhooks/stripe'
import vapiWebhook from './webhooks/vapi'

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
	await fastify.register(stripeRoute, { prefix: '/api/v1/stripe' })
	await fastify.register(stripeWebhook, { prefix: '/api/v1/webhooks-stripe' })
	await fastify.register(vapiWebhook, { prefix: '/api/v1/webhooks-vapi' })
	await fastify.register(clerkWebhook, { prefix: '/api/v1/webhooks-clerk' })
	await fastify.register(businessRoute, { prefix: '/api/v1/businesses' })
	await fastify.register(callRoute, { prefix: '/api/v1/calls' })
	await fastify.register(businessUsersRoute, { prefix: '/api/v1/business-users' })
	await fastify.register(businessUserInvitationsRoute, { prefix: '/api/v1/business-user-invitations' })
	await fastify.register(websiteScrapeRoutes, { prefix: '/api/v1/scrape' })
	await fastify.register(superAdminRoutes, { prefix: '/api/v1/super-admin' })
}
