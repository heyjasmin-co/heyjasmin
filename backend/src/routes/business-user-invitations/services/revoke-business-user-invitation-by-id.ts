import { FastifyRequest } from 'fastify'
import { BusinessUserInvitation } from '../../../models/BusinessUserInvitation'
import { RevokeBusinessUserInvitationInput, RevokeBusinessUserInvitationOutput } from './types'

export const revokeBusinessUserInvitationByToken = async (
	request: FastifyRequest,
	args: RevokeBusinessUserInvitationInput
): Promise<RevokeBusinessUserInvitationOutput> => {
	const { invitationToken } = args

	const deletedInvitation = await BusinessUserInvitation.findOneAndDelete({ invitationToken })
	request.log.info('Business user invitation revoked successfully')
	return deletedInvitation
}
