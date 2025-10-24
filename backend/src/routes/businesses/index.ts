import { FastifyInstance } from 'fastify'
import { authenticate } from '../../middleware/clerkAuth'
import { getBusinessDetailsByIdHandler } from './handlers/get-business-details-by-id'
import {
	getBusinessDetailsByIdParamsSchema,
	updateBusinessDetailsByIdBodySchema,
	updateBusinessDetailsByIdParamsSchema,
	updateBusinessHoursByIdBodySchema,
	updateBusinessHoursByIdParamsSchema,
	updateBusinessInformationByIdBodySchema,
	updateBusinessInformationByIdParamsSchema,
	updateBusinessServicesByIdBodySchema,
	updateBusinessServicesByIdParamsSchema,
} from './handlers/types'
import { updateBusinessDetailsByIdHandler } from './handlers/update-business-details-by-id'
import { updateBusinessHoursByIdHandler } from './handlers/update-business-hours-by-id'
import { updateBusinessInformationByIdHandler } from './handlers/update-business-information-by-id'
import { updateBusinessServicesByIdHandler } from './handlers/update-business-services-by-id'

export default async function businessRoute(fastify: FastifyInstance) {
	// Get Business Details by Id
	fastify.get('/:businessId', {
		preHandler: [authenticate],
		schema: {
			tags: ['businesses'],
			description: 'Get Business Details information',
			params: getBusinessDetailsByIdParamsSchema,
		},
		handler: getBusinessDetailsByIdHandler,
	})

	// Update Business Details by Id
	fastify.patch('/:businessId', {
		preHandler: [authenticate],
		schema: {
			tags: ['businesses'],
			description: 'Update Business Details information',
			params: updateBusinessDetailsByIdParamsSchema,
			body: updateBusinessDetailsByIdBodySchema,
		},
		handler: updateBusinessDetailsByIdHandler,
	})

	// Update Business Information by Id
	fastify.patch('/information/:businessId', {
		preHandler: [authenticate],
		schema: {
			tags: ['businesses'],
			description: 'Update Business Information information',
			params: updateBusinessInformationByIdParamsSchema,
			body: updateBusinessInformationByIdBodySchema,
		},
		handler: updateBusinessInformationByIdHandler,
	})

	// Update Business Services by Id
	fastify.patch('/services/:businessId', {
		preHandler: [authenticate],
		schema: {
			tags: ['businesses'],
			description: 'Update Business Services',
			params: updateBusinessServicesByIdParamsSchema,
			body: updateBusinessServicesByIdBodySchema,
		},
		handler: updateBusinessServicesByIdHandler,
	})

	// Update Business Hours by Id
	fastify.patch('/hours/:businessId', {
		preHandler: [authenticate],
		schema: {
			tags: ['businesses'],
			description: 'Update Business Hours',
			params: updateBusinessHoursByIdParamsSchema,
			body: updateBusinessHoursByIdBodySchema,
		},
		handler: updateBusinessHoursByIdHandler,
	})
}
