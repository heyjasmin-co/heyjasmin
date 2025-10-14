import { FastifyInstance } from 'fastify'
import { authenticate } from '../../middleware/clerkAuth'
import { getUserByClerkIdHandler } from './handlers/getUserByClerkId'
import { meHandler } from './handlers/me'
import { getUserByClerkIdParamsSchema } from './handlers/types'

export default async function userRoutes(fastify: FastifyInstance) {
	// Get current user (me)
	fastify.get('/me', {
		schema: {
			tags: ['users'],
			description: 'Get current user information',
		},
		handler: meHandler,
	})

	// Get user by clerk ID
	fastify.get('/:clerkId', {
		preHandler: [authenticate],
		schema: {
			tags: ['users'],
			description: 'Get user by clerk ID',
			params: getUserByClerkIdParamsSchema,
		},
		handler: getUserByClerkIdHandler,
	})
}
