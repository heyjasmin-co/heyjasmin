import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessUsersInvitationService } from '../services'
import {
	createBusinessUserInvitationByIdBodySchema,
	createBusinessUserInvitationByIdParamsSchema,
	revokeBusinessUserInvitationByIdParamsSchema,
} from './types'

export const revokeBusinessUserInvitationByIdHandler = asyncHandler(async (request, reply) => {
	const params = revokeBusinessUserInvitationByIdParamsSchema.parse(request.params)
	const businessUsersInvitationService = new BusinessUsersInvitationService()
	const businessUsersInvitations = await businessUsersInvitationService.revokeBusinessUserInvitationById(request, params)

	return reply.status(200).send({
		success: true,
		message: 'Business User Invitation cancelled successfully',
		data: businessUsersInvitations,
	})
})
