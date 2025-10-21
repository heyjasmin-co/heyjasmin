import { clerkClient } from '@clerk/fastify'
import { FastifyRequest } from 'fastify'
import { BusinessUserInvitation } from '../../../models/BusinessUserInvitation'
import { RevokeBusinessUserInvitationInput, RevokeBusinessUserInvitationOutput } from './types'

export const revokeBusinessUserInvitationById = async (
	request: FastifyRequest,
	args: RevokeBusinessUserInvitationInput
): Promise<RevokeBusinessUserInvitationOutput> => {
	const { invitationId } = args

	const businessUserInvitation = await BusinessUserInvitation.aggregate([
		{
			$match: {
				clerKInvitationId: invitationId,
			},
		},
		{
			$lookup: {
				from: 'businesses',
				localField: 'businessId',
				foreignField: '_id',
				as: 'business',
			},
		},
		{
			$unwind: {
				path: '$business',
				preserveNullAndEmptyArrays: false,
			},
		},
	])

	// Check if invitation exists
	if (!businessUserInvitation || businessUserInvitation.length === 0) {
		throw new Error('Invitation not found')
	}

	const invitation = businessUserInvitation[0]

	// Check if business has clerkOrganizationId
	if (!invitation.business?.clerkOrganizationId) {
		throw new Error('Business does not have a linked Clerk organization')
	}

	// Revoke invitation in Clerk and delete from database
	const [_, deletedInvitation] = await Promise.all([
		clerkClient.organizations.revokeOrganizationInvitation({
			organizationId: invitation.business.clerkOrganizationId,
			invitationId,
		}),
		BusinessUserInvitation.findOneAndDelete({
			clerKInvitationId: invitationId,
		}),
	])

	// Return the deleted invitation
	if (!deletedInvitation) {
		throw new Error('Failed to delete invitation from database')
	}

	return deletedInvitation
}
