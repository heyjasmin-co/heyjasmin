import { FastifyInstance } from 'fastify'
import { createContext } from '../../context'
import { authenticate } from '../../middleware/clerkAuth'
import { requireActiveSubscription } from '../../middleware/subscription'

import { createRecipientHandler } from './handlers/create-recipient'
import { deleteRecipientHandler } from './handlers/delete-recipient'
import { getSettingsHandler } from './handlers/get-settings'
import {
	businessIdParamsSchema,
	createRecipientBodySchema,
	recipientIdParamsSchema,
	recipientTypeParamsSchema,
	updateRecipientBodySchema,
	updateToggleBodySchema,
} from './handlers/types'
import { updateEmailToggleHandler } from './handlers/update-email-toggle'
import { updateRecipientHandler } from './handlers/update-recipient'
import { updateTextToggleHandler } from './handlers/update-text-toggle'

export default async function businessCallNotificationsRoute(fastify: FastifyInstance) {
	fastify.get('/:businessId', {
		preHandler: [createContext, authenticate, requireActiveSubscription],
		schema: {
			tags: ['business-call-notifications'],
			description: 'Get Business Call Notifications Settings',
			params: businessIdParamsSchema,
		},
		handler: getSettingsHandler,
	})

	fastify.patch('/:businessId/email-toggle', {
		preHandler: [createContext, authenticate, requireActiveSubscription],
		schema: {
			tags: ['business-call-notifications'],
			description: 'Update Email Notifications Toggle',
			params: businessIdParamsSchema,
			body: updateToggleBodySchema,
		},
		handler: updateEmailToggleHandler,
	})

	fastify.patch('/:businessId/text-toggle', {
		preHandler: [createContext, authenticate, requireActiveSubscription],
		schema: {
			tags: ['business-call-notifications'],
			description: 'Update Text Notifications Toggle',
			params: businessIdParamsSchema,
			body: updateToggleBodySchema,
		},
		handler: updateTextToggleHandler,
	})

	fastify.post('/:businessId/recipients/:type', {
		preHandler: [createContext, authenticate, requireActiveSubscription],
		schema: {
			tags: ['business-call-notifications'],
			description: 'Add a new notification recipient',
			params: recipientTypeParamsSchema,
			body: createRecipientBodySchema,
		},
		handler: createRecipientHandler,
	})

	fastify.patch('/:businessId/recipients/:type/:recipientId', {
		preHandler: [createContext, authenticate, requireActiveSubscription],
		schema: {
			tags: ['business-call-notifications'],
			description: 'Update a notification recipient',
			params: recipientIdParamsSchema,
			body: updateRecipientBodySchema,
		},
		handler: updateRecipientHandler,
	})

	fastify.delete('/:businessId/recipients/:type/:recipientId', {
		preHandler: [createContext, authenticate, requireActiveSubscription],
		schema: {
			tags: ['business-call-notifications'],
			description: 'Delete a notification recipient',
			params: recipientIdParamsSchema,
		},
		handler: deleteRecipientHandler,
	})
}
