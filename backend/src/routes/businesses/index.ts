import { FastifyInstance } from 'fastify'
import { createContext } from '../../context'
import { authenticate } from '../../middleware/clerkAuth'
import { createBusinessGoogleProfileHandler } from './handlers/create-business-google-profile'
import { getBusinessDetailsByIdHandler } from './handlers/get-business-details-by-id'
import {
	createBusinessGoogleProfileBodySchema,
	getBusinessDetailsByIdParamsSchema,
	updateBusinessAssistantByIdParamsSchema,
	updateBusinessAssistantSetupByIdBodySchema,
	updateBusinessAssistantSetupByIdParamsSchema,
	updateBusinessDetailsByIdBodySchema,
	updateBusinessDetailsByIdParamsSchema,
	updateBusinessHoursByIdBodySchema,
	updateBusinessHoursByIdParamsSchema,
	updateBusinessInformationByIdBodySchema,
	updateBusinessInformationByIdParamsSchema,
	updateBusinessServicesByIdBodySchema,
	updateBusinessServicesByIdParamsSchema,
} from './handlers/types'
import { updateBusinessAssistantByIdHandler } from './handlers/update-business-assistance-by-id'
import { updateBusinessAssistantSetupByIdHandler } from './handlers/update-business-assistant-setup-by-id'
import { updateBusinessDetailsByIdHandler } from './handlers/update-business-details-by-id'
import { updateBusinessHoursByIdHandler } from './handlers/update-business-hours-by-id'
import { updateBusinessInformationByIdHandler } from './handlers/update-business-information-by-id'
import { updateBusinessServicesByIdHandler } from './handlers/update-business-services-by-id'

export default async function businessRoute(fastify: FastifyInstance) {
	// Get Business Details by Id
	fastify.get('/:businessId', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['businesses'],
			description: 'Get Business Details information',
			params: getBusinessDetailsByIdParamsSchema,
		},
		handler: getBusinessDetailsByIdHandler,
	})

	// Update Business Assistant Setup by Id
	fastify.patch('/update-assistant-setup/:businessId', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['businesses'],
			description: 'Update Business Assistant Setup',
			params: updateBusinessAssistantSetupByIdParamsSchema,
			body: updateBusinessAssistantSetupByIdBodySchema,
		},
		handler: updateBusinessAssistantSetupByIdHandler,
	})

	// Update Business Assistant by Id
	fastify.post('/update-assistant/:businessId', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['businesses'],
			description: 'Update Business Assistant',
			params: updateBusinessAssistantByIdParamsSchema,
		},
		handler: updateBusinessAssistantByIdHandler,
	})

	// Update Business Details by Id
	fastify.patch('/:businessId', {
		preHandler: [createContext, authenticate],
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
		preHandler: [createContext, authenticate],
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
		preHandler: [createContext, authenticate],
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
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['businesses'],
			description: 'Update Business Hours',
			params: updateBusinessHoursByIdParamsSchema,
			body: updateBusinessHoursByIdBodySchema,
		},
		handler: updateBusinessHoursByIdHandler,
	})
	// Create Business from google profile
	fastify.post('/', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['businesses'],
			description: 'Create Business From google profile',
			body: createBusinessGoogleProfileBodySchema,
		},
		handler: createBusinessGoogleProfileHandler,
	})
}
