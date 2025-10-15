import { FastifyInstance } from 'fastify'
import { authenticate } from '../../middleware/clerkAuth'
import { getUserBusinessesHandler } from './handlers/getUserBusinesses'
import { getUserByClerkIdHandler } from './handlers/getUserByClerkId'
import { logoutHandler } from './handlers/logout'
import { meHandler } from './handlers/me'
import { selectUserBusinessHandler } from './handlers/selectUserBusiness'
import { getUserByClerkIdParamsSchema, selectUserBusinessSchema } from './handlers/types'

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

	// Get user businesses
	fastify.get('/user-businesses', {
		preHandler: [authenticate],
		schema: {
			tags: ['users'],
			description: 'Get user businesses',
		},
		handler: getUserBusinessesHandler,
	})

	// Logout User
	fastify.post('/logout', {
		preHandler: [authenticate],
		schema: {
			tags: ['users'],
			description: 'Logs out the authenticated user',
		},
		handler: logoutHandler,
	})

	// Select User Business
	fastify.post('/select-business', {
		preHandler: [authenticate],
		schema: {
			tags: ['users'],
			description: 'Select User Business',
			body: selectUserBusinessSchema,
		},
		handler: selectUserBusinessHandler,
	})
}
