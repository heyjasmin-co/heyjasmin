import { FastifyInstance } from 'fastify'
import { createContext } from '../../context'
import { authenticate } from '../../middleware/clerkAuth'
import { getUserBusinessesHandler } from './handlers/get-user-businesses'
import { getUserByClerkIdHandler } from './handlers/get-user-by-clerk-id'
import { logoutHandler } from './handlers/logout'
import { meHandler } from './handlers/me'
import { selectUserBusinessHandler } from './handlers/select-user-business'
import { getUserByClerkIdParamsSchema, selectUserBusinessBodySchema, selectUserBusinessParamsSchema } from './handlers/types'

export default async function userRoutes(fastify: FastifyInstance) {
	// Get current user (me)
	fastify.get('/me', {
		preHandler: [createContext],
		schema: {
			tags: ['users'],
			description: 'Get current user information',
		},
		handler: meHandler,
	})

	// Get user by clerk ID
	fastify.get('/:clerkId', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['users'],
			description: 'Get user by clerk ID',
			params: getUserByClerkIdParamsSchema,
		},
		handler: getUserByClerkIdHandler,
	})

	// Get user businesses
	fastify.get('/user-businesses', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['users'],
			description: 'Get user businesses',
		},
		handler: getUserBusinessesHandler,
	})

	// Logout User
	fastify.post('/logout', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['users'],
			description: 'Logs out the authenticated user',
		},
		handler: logoutHandler,
	})

	// Select User Business
	fastify.post('/select-business/:businessId', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['users'],
			description: 'Select User Business',
			params: selectUserBusinessParamsSchema,
			body: selectUserBusinessBodySchema,
		},
		handler: selectUserBusinessHandler,
	})
}
