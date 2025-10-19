import { FastifyInstance } from 'fastify'
import { getBusinessUsersByIdHandler } from './handlers/get-business-users-by-id'
import { getBusinessUsersByIdParamsSchema } from './handlers/types'

export default async function businessUsersRoute(fastify: FastifyInstance) {
	// Get Business Users by Id
	fastify.get('/:businessId', {
		schema: {
			tags: ['businessUsers'],
			description: 'Get Business Users Details',
			params: getBusinessUsersByIdParamsSchema,
		},
		handler: getBusinessUsersByIdHandler,
	})
}
