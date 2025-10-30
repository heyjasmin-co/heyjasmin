import { FastifyInstance } from 'fastify'
import { createContext } from '../../context'
import { authenticate } from '../../middleware/clerkAuth'
import { getCallByIdHandler } from './handlers/get-call-by-id'
import { getCallsByBusinessIdHandler } from './handlers/get-calls-by-business-id'
import { getCallByIdParamsSchemaInput, getCallByIdQuerySchemaInput, getCallsByBusinessIdParamsSchemaInput } from './handlers/types'

export default async function callRoute(fastify: FastifyInstance) {
	// Get Business Calls by Business Id
	fastify.get('/:businessId', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['calls'],
			description: 'Get Business Calls by Business Id',
			params: getCallsByBusinessIdParamsSchemaInput,
		},
		handler: getCallsByBusinessIdHandler,
	})

	// Get Business Call by Call Id
	fastify.get('/call/:callId', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['calls'],
			description: 'Get Business Call by Call Id',
			params: getCallByIdParamsSchemaInput,
			querystring: getCallByIdQuerySchemaInput,
		},
		handler: getCallByIdHandler,
	})
}
