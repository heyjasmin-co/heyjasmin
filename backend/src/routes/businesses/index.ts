import { FastifyInstance } from 'fastify'
import { getBusinessDetailsByIdHandler } from './handlers/get-business-details-by-id'
import { getBusinessDetailsByIdParamsSchema } from './handlers/types'

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
}
