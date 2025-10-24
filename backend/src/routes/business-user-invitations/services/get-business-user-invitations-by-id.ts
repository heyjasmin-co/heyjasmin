import { FastifyRequest } from 'fastify'
import { BusinessUserInvitation } from '../../../models/BusinessUserInvitation'
import { GetBusinessUserInvitationsInput, GetBusinessUserInvitationsOutput } from './types'

export const getBusinessUserInvitationsById = async (
	request: FastifyRequest,
	args: GetBusinessUserInvitationsInput
): Promise<GetBusinessUserInvitationsOutput> => {
	const { businessId } = args
	
	const businessUserInvitations = await BusinessUserInvitation.find({ businessId })

	return businessUserInvitations as GetBusinessUserInvitationsOutput
}
