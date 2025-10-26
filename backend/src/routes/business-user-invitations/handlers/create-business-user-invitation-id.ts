import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessUsersInvitationService } from '../services'
import { createBusinessUserInvitationByIdBodySchema, createBusinessUserInvitationByIdParamsSchema } from './types'

export const createBusinessUserInvitationByIdHandler = asyncHandler(async (request, reply) => {
	const params = createBusinessUserInvitationByIdParamsSchema.parse(request.params)
	const body = createBusinessUserInvitationByIdBodySchema.parse(request.body)
	const businessUsersInvitationService = new BusinessUsersInvitationService()
	const businessUsersInvitations = await businessUsersInvitationService.createBusinessUserInvitationById(request, { ...body, ...params })

	return reply.status(200).send({
		success: true,
		message: 'Business User Invitation created successfully',
		data: businessUsersInvitations,
	})
})
