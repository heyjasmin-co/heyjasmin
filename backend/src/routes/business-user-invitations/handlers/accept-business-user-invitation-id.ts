import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessUsersInvitationService } from '../services'
import { acceptBusinessUserInvitationByIdBodySchema } from './types'

export const acceptBusinessUserInvitationByIdHandler = asyncHandler(async (request, reply) => {
	const body = acceptBusinessUserInvitationByIdBodySchema.parse(request.body)
	const businessUsersInvitationService = new BusinessUsersInvitationService()
	const businessUsersInvitations = await businessUsersInvitationService.acceptBusinessUserInvitationById(request, body)

	return reply.status(200).send({
		success: true,
		message: 'Business User Invitation accepted successfully',
		data: businessUsersInvitations,
	})
})
