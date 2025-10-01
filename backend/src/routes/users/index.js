import * as userService from '../../services/user.service.js'
import { createValidationMiddleware } from '../../utils/zodToJsonSchema.js'
import * as validators from '../../validators/index.js'
import { getUserMeSchema, getUserByIdSchema, getAllUsersSchema } from './schemas.js'

export default async function userRoutes(fastify) {
	// Get current user (protected)
	fastify.get(
		'/me',
		{
			preHandler: fastify.authenticate,
			schema: getUserMeSchema,
		},
		async (request, reply) => {
			try {
				const user = await userService.getUserByClerkId(request.userId)

				if (!user) {
					return reply.notFound('User not found')
				}

				return { user }
			} catch (error) {
				fastify.log.error(error)
				return reply.internalServerError('Failed to fetch user')
			}
		}
	)

	// Get user by ID
	fastify.get(
		'/:id',
		{
			schema: getUserByIdSchema,
			preHandler: async (request, reply) => {
				try {
					validators.userIdParamValidator.parse(request.params)
				} catch (error) {
					return reply.code(400).send({
						statusCode: 400,
						error: 'Validation Error',
						message: 'Invalid user ID format',
						details: error.errors,
					})
				}
			},
		},
		async (request, reply) => {
			try {
				const user = await userService.getUserById(request.params.id)

				if (!user) {
					return reply.notFound('User not found')
				}

				return { user }
			} catch (error) {
				fastify.log.error(error)
				return reply.internalServerError('Failed to fetch user')
			}
		}
	)

	// Get all users (protected)
	fastify.get(
		'/',
		{
			preHandler: [
				fastify.authenticate,
				async (request, reply) => {
					try {
						const validated = validators.paginationValidator.parse(request.query)
						request.query = validated
					} catch (error) {
						return reply.code(400).send({
							statusCode: 400,
							error: 'Validation Error',
							message: 'Invalid pagination parameters',
							details: error.errors,
						})
					}
				},
			],
			schema: getAllUsersSchema,
		},
		async (request, reply) => {
			try {
				const { page, limit } = request.query
				const result = await userService.getAllUsers({}, { page, limit })
				return result
			} catch (error) {
				fastify.log.error(error)
				return reply.internalServerError('Failed to fetch users')
			}
		}
	)
}
