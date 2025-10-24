import { FastifyInstance } from 'fastify'
import { authenticate } from '../../middleware/clerkAuth'
import { acceptBusinessUserInvitationByIdHandler } from './handlers/accept-business-user-invitation-id'
import { createBusinessUserInvitationByIdHandler } from './handlers/create-business-user-invitation-id'
import { getBusinessUserInvitationsByIdHandler } from './handlers/get-business-user-invitations-by-id'
import { revokeBusinessUserInvitationByIdHandler } from './handlers/revoke-business-user-invitation-by-id'
import {
	acceptBusinessUserInvitationByIdBodySchema,
	createBusinessUserInvitationByIdBodySchema,
	createBusinessUserInvitationByIdParamsSchema,
	getBusinessUserInvitationsByIdParamsSchema,
	revokeBusinessUserInvitationByIdParamsSchema,
} from './handlers/types'
export default async function businessUserInvitationsRoute(fastify: FastifyInstance) {
	// Get Business User Invitation
	fastify.get('/:businessId', {
		preHandler: [authenticate],
		schema: {
			tags: ['business-user-invitations'],
			description: 'Get Business User Invitations Details',
			params: getBusinessUserInvitationsByIdParamsSchema,
		},
		handler: getBusinessUserInvitationsByIdHandler,
	})

	// Create Business User Invitation
	fastify.post('/create/:businessId', {
		preHandler: [authenticate],
		schema: {
			tags: ['business-user-invitations'],
			description: 'Create Business User Invitation',
			params: createBusinessUserInvitationByIdParamsSchema,
			body: createBusinessUserInvitationByIdBodySchema,
		},
		handler: createBusinessUserInvitationByIdHandler,
	})
	// Create Business User Invitation
	fastify.delete('/revoke/:invitationId', {
		preHandler: [authenticate],
		schema: {
			tags: ['business-user-invitations'],
			description: 'Revoke Business User Invitation',
			params: revokeBusinessUserInvitationByIdParamsSchema,
		},
		handler: revokeBusinessUserInvitationByIdHandler,
	})

	// Accept Business User Invitation
	fastify.post('/accept', {
		preHandler: [authenticate],
		schema: {
			tags: ['business-user-invitations'],
			description: 'Accept Business User Invitation',
			body: acceptBusinessUserInvitationByIdBodySchema,
		},
		handler: acceptBusinessUserInvitationByIdHandler,
	})
}
