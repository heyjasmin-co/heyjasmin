import { FastifyInstance } from 'fastify'
import { createContext } from '../../context'
import { authenticate } from '../../middleware/clerkAuth'
import { requireActiveSubscription } from '../../middleware/subscription'
import { acceptBusinessUserInvitationByIdHandler } from './handlers/accept-business-user-invitation-id'
import { createBusinessUserInvitationByIdHandler } from './handlers/create-business-user-invitation-id'
import { getBusinessUserInvitationsByIdHandler } from './handlers/get-business-user-invitations-by-id'
import { revokeBusinessUserInvitationByTokenHandler } from './handlers/revoke-business-user-invitation-by-id'
import {
	acceptBusinessUserInvitationByIdBodySchema,
	createBusinessUserInvitationByIdBodySchema,
	createBusinessUserInvitationByIdParamsSchema,
	getBusinessUserInvitationsByIdParamsSchema,
	revokeBusinessUserInvitationByTokenParamsSchema,
} from './handlers/types'
export default async function businessUserInvitationsRoute(fastify: FastifyInstance) {
	// Get Business User Invitation
	fastify.get('/:businessId', {
		preHandler: [createContext, authenticate],
		schema: {
			tags: ['business-user-invitations'],
			description: 'Get Business User Invitations Details',
			params: getBusinessUserInvitationsByIdParamsSchema,
		},
		handler: getBusinessUserInvitationsByIdHandler,
	})

	// Create Business User Invitation
	fastify.post('/create/:businessId', {
		preHandler: [createContext, authenticate, requireActiveSubscription],
		schema: {
			tags: ['business-user-invitations'],
			description: 'Create Business User Invitation',
			params: createBusinessUserInvitationByIdParamsSchema,
			body: createBusinessUserInvitationByIdBodySchema,
		},
		handler: createBusinessUserInvitationByIdHandler,
	})
	// Revoke Business User Invitation
	fastify.delete('/revoke/:invitationToken', {
		preHandler: [createContext, authenticate, requireActiveSubscription],
		schema: {
			tags: ['business-user-invitations'],
			description: 'Revoke Business User Invitation',
			params: revokeBusinessUserInvitationByTokenParamsSchema,
		},
		handler: revokeBusinessUserInvitationByTokenHandler,
	})

	// Accept Business User Invitation
	fastify.post('/accept', {
		schema: {
			tags: ['business-user-invitations'],
			description: 'Accept Business User Invitation',
			body: acceptBusinessUserInvitationByIdBodySchema,
		},
		handler: acceptBusinessUserInvitationByIdHandler,
	})
}
