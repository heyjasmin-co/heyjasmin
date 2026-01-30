import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessUsersInvitationService } from '../services'
import { revokeBusinessUserInvitationByTokenParamsSchema } from './types'

export const revokeBusinessUserInvitationByTokenHandler = asyncHandler(async (request, reply) => {
	const params = revokeBusinessUserInvitationByTokenParamsSchema.parse(request.params)
	const businessUsersInvitationService = new BusinessUsersInvitationService()
	const businessUsersInvitations = await businessUsersInvitationService.revokeBusinessUserInvitationByToken(request, params)

	return reply.status(200).send({
		success: true,
		message: 'Business User Invitation cancelled successfully',
		data: businessUsersInvitations,
	})
})
