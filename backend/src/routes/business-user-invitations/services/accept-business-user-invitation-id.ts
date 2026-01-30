import { FastifyRequest } from 'fastify'
import { ClientSession } from 'mongoose'
import clerkClient from '../../../config/clerk'
import { Business, BusinessUser, User } from '../../../models'
import { BusinessUserInvitation } from '../../../models/BusinessUserInvitation'
import { runTransaction } from '../../../utils/transaction'
import { AcceptBusinessUserInvitationInput, AcceptBusinessUserInvitationOutput } from './types'

export const acceptBusinessUserInvitationById = async (
	request: FastifyRequest,
	args: AcceptBusinessUserInvitationInput
): Promise<AcceptBusinessUserInvitationOutput> => {
	const { invitationToken, userId } = args

	return await runTransaction(async (session) => {
		const businessUser = await validateAndCreateBusinessMemberUser({ invitationToken, userId, session, existingUser: true })
		request.log.info('Business user accepted invitation successfully')
		return businessUser
	})
}

export const validateAndCreateBusinessMemberUser = async ({
	invitationToken,
	userId,
	session,
	existingUser = false,
}: {
	invitationToken: string
	userId: string
	session: ClientSession
	existingUser?: boolean
}) => {
	const invitation = await BusinessUserInvitation.findOne({
		invitationToken,
		status: 'pending',
	}).session(session)

	if (!invitation) {
		throw new Error('Invitation not found or already used')
	}

	// Check if invitation has expired
	if (invitation.expiresAt < new Date()) {
		invitation.status = 'expired'
		await invitation.save({ session })
		throw new Error('Invitation has expired')
	}

	// Find business
	const business = await Business.findById(invitation.businessId).session(session)
	if (!business?._id) {
		throw new Error('Business not found')
	}

	// Verify the user exists
	const user = await User.findById(userId).session(session)
	if (!user?._id) {
		throw new Error('User not found')
	}

	// Verify email matches the invitation
	if (user.email !== invitation.email) {
		throw new Error('Email mismatch. This invitation was sent to a different email address.')
	}

	// Check if user is already a member of the business
	const existingBusinessUser = await BusinessUser.findOne({
		businessId: invitation.businessId,
		userId,
	}).session(session)

	if (existingBusinessUser?._id) {
		throw new Error('User is already a member of this business')
	}

	// Create business user record in database
	const newBusinessUser = new BusinessUser({
		businessId: invitation.businessId,
		userId,
		role: invitation.role,
		status: 'active',
	})

	const savedBusinessUser = await newBusinessUser.save({ session })

	if (!existingUser) {
		// update user metadata
		await clerkClient.users.updateUserMetadata(user.clerkId, {
			publicMetadata: {
				dbUserId: user._id,
				clerkId: user.clerkId,
				businessId: invitation.businessId,
				role: invitation.role,
			},
		})
	}
	// Delete invitation
	await BusinessUserInvitation.findByIdAndDelete(invitation._id).session(session)
	return savedBusinessUser
}
