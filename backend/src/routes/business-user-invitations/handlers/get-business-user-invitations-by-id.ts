import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessUsersInvitationService } from '../services'
import { getBusinessUserInvitationsByIdParamsSchema } from './types'

export const getBusinessUserInvitationsByIdHandler = asyncHandler(async (request, reply) => {
	const params = getBusinessUserInvitationsByIdParamsSchema.parse(request.params)
	const businessUsersInvitationService = new BusinessUsersInvitationService()
	const businessUsersInvitations = await businessUsersInvitationService.getBusinessUserInvitationsById(request, params)

	return reply.status(200).send({
		success: true,
		message: 'Business User Invitations fetch Successfully',
		data: businessUsersInvitations,
	})
})
