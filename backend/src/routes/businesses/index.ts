import { FastifyInstance } from 'fastify'
import { getBusinessDetailsByIdHandler } from './handlers/get-business-details-by-id'
import {
	getBusinessDetailsByIdParamsSchema,
	updateBusinessDetailsByIdBodySchema,
	updateBusinessDetailsByIdParamsSchema,
	updateBusinessInformationByIdBodySchema,
	updateBusinessInformationByIdParamsSchema,
} from './handlers/types'
import { updateBusinessDetailsByIdHandler } from './handlers/update-business-details-by-id'
import { updateBusinessInformationByIdHandler } from './handlers/update-business-information-by-id'

export default async function businessRoute(fastify: FastifyInstance) {
	// Get Business Details by Id
	fastify.get('/:businessId', {
		schema: {
			tags: ['businesses'],
			description: 'Get Business Details information',
			params: getBusinessDetailsByIdParamsSchema,
		},
		handler: getBusinessDetailsByIdHandler,
	})

	// Update Business Details by Id
	fastify.patch('/:businessId', {
		schema: {
			tags: ['businesses'],
			description: 'Update Business Details information',
			params: updateBusinessDetailsByIdParamsSchema,
			body: updateBusinessDetailsByIdBodySchema,
		},
		handler: updateBusinessDetailsByIdHandler,
	})

	// Update Business Information by Id
	fastify.patch('/business-info/:businessId', {
		schema: {
			tags: ['businesses'],
			description: 'Update Business Information information',
			params: updateBusinessInformationByIdParamsSchema,
			body: updateBusinessInformationByIdBodySchema,
		},
		handler: updateBusinessInformationByIdHandler,
	})
}
