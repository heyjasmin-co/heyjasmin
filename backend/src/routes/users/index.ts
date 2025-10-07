import { FastifyInstance } from 'fastify'
import { authenticate } from '../../middleware/clerkAuth'
import { getUserByClerkIdHandler } from './handlers/getUserByClerkId'
import { getUserByClerkIdParamsSchema } from './handlers/types'

export default async function userRoutes(fastify: FastifyInstance) {
	// Get user by clerk ID
	fastify.get('/:clerkId', {
		// Added parameter to route
		onRequest: [authenticate],
		schema: {
			tags: ['users'],
			description: 'Get user by clerk ID',
			params: getUserByClerkIdParamsSchema,
		},
		handler: getUserByClerkIdHandler,
	})
}
