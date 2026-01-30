import { acceptBusinessUserInvitationById } from './accept-business-user-invitation-id'
import { createBusinessUserInvitationById } from './create-business-user-invitation'
import { getBusinessUserInvitationsById } from './get-business-user-invitations-by-id'
import { revokeBusinessUserInvitationByToken } from './revoke-business-user-invitation-by-id'

export class BusinessUsersInvitationService {
	getBusinessUserInvitationsById = getBusinessUserInvitationsById
	createBusinessUserInvitationById = createBusinessUserInvitationById
	revokeBusinessUserInvitationByToken = revokeBusinessUserInvitationByToken
	acceptBusinessUserInvitationById = acceptBusinessUserInvitationById
}
