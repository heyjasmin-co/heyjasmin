import { FastifyInstance } from 'fastify'
import { deleteBusinessUserByIdHandler } from './handlers/delete-business-user-by-id'
import { getBusinessUsersByIdHandler } from './handlers/get-business-users-by-id'
import {
	deleteBusinessUserByIdParamsSchema,
	getBusinessUsersByIdParamsSchema,
	updateBusinessUserByIdBodySchema,
	updateBusinessUserByIdParamsSchema,
} from './handlers/types'
import { updateBusinessUsersByIdHandler } from './handlers/update-business-user-by-id'

export default async function businessUsersRoute(fastify: FastifyInstance) {
	// Get Business Users by Id
	fastify.get('/:businessId', {
		schema: {
			tags: ['business-users'],
			description: 'Get Business Users Details',
			params: getBusinessUsersByIdParamsSchema,
		},
		handler: getBusinessUsersByIdHandler,
	})

	// Delete Business User by Id
	fastify.delete('/:businessUserId', {
		schema: {
			tags: ['business-users'],
			description: 'Remove Business User By Id',
			params: deleteBusinessUserByIdParamsSchema,
		},
		handler: deleteBusinessUserByIdHandler,
	})

	// Update Business User by Id
	fastify.patch('/:businessUserId', {
		schema: {
			tags: ['business-users'],
			description: 'Update Business User By Id',
			params: updateBusinessUserByIdParamsSchema,
			body: updateBusinessUserByIdBodySchema,
		},
		handler: updateBusinessUsersByIdHandler,
	})
}
