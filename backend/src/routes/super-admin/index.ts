import { FastifyInstance } from 'fastify'
import { authenticateSuperAdmin } from '../../middleware/superAdminAuth'

import {
	changeEmailHandler,
	changePasswordHandler,
	deleteBusinessAndUserHandler,
	forgotPasswordHandler,
	getBusinessesHandler,
	loginHandler,
	resetPasswordHandler,
	signupHandler,
	verifyEmailChangeHandler,
} from './handlers'
import {
	changeEmailBodySchema,
	changePasswordBodySchema,
	deleteBusinessParamsSchema,
	forgotPasswordBodySchema,
	loginBodySchema,
	resetPasswordBodySchema,
	signupBodySchema,
	verifyEmailChangeBodySchema,
} from './handlers/types'

export default async function superAdminRoutes(fastify: FastifyInstance) {
	// Signup
	fastify.post('/signup', {
		schema: {
			tags: ['super-admin'],
			description: 'Create a new super admin',
			body: signupBodySchema,
		},
		handler: signupHandler,
	})

	// Login
	fastify.post('/login', {
		schema: {
			tags: ['super-admin'],
			description: 'Login super admin',
			body: loginBodySchema,
		},
		handler: loginHandler,
	})

	// Forgot Password
	fastify.post('/forgot-password', {
		schema: {
			tags: ['super-admin'],
			description: 'Request password reset',
			body: forgotPasswordBodySchema,
		},
		handler: forgotPasswordHandler,
	})

	// Reset Password
	fastify.post('/reset-password', {
		schema: {
			tags: ['super-admin'],
			description: 'Reset password with token',
			body: resetPasswordBodySchema,
		},
		handler: resetPasswordHandler,
	})

	// Change Password
	fastify.post('/change-password', {
		preHandler: [authenticateSuperAdmin],
		schema: {
			tags: ['super-admin'],
			description: 'Change super admin password',
			body: changePasswordBodySchema,
		},
		handler: changePasswordHandler,
	})

	// Change Email
	fastify.post('/change-email', {
		preHandler: [authenticateSuperAdmin],
		schema: {
			tags: ['super-admin'],
			description: 'Change super admin email',
			body: changeEmailBodySchema,
		},
		handler: changeEmailHandler,
	})

	// Verify Email Change
	fastify.post('/verify-email-change', {
		schema: {
			tags: ['super-admin'],
			description: 'Verify and apply super admin email change',
			body: verifyEmailChangeBodySchema,
		},
		handler: verifyEmailChangeHandler,
	})

	// Get Businesses
	fastify.get('/businesses', {
		preHandler: [authenticateSuperAdmin],
		schema: {
			tags: ['super-admin'],
			description: 'Get all businesses',
		},
		handler: getBusinessesHandler,
	})

	// Delete Business and User
	fastify.delete('/businesses/:id', {
		preHandler: [authenticateSuperAdmin],
		schema: {
			tags: ['super-admin'],
			description: 'Delete business and associated owner',
			params: deleteBusinessParamsSchema,
		},
		handler: deleteBusinessAndUserHandler,
	})
}
