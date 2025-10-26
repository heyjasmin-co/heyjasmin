import { clerkClient } from '@clerk/fastify'
import { FastifyRequest } from 'fastify'
import { Business, BusinessUser, User } from '../../../models'
import { BusinessUserInvitation } from '../../../models/BusinessUserInvitation'
import { runTransaction } from '../../../utils/transaction'
import { AcceptBusinessUserInvitationInput, AcceptBusinessUserInvitationOutput } from './types'

export const acceptBusinessUserInvitationById = async (
	request: FastifyRequest,
	args: AcceptBusinessUserInvitationInput
): Promise<AcceptBusinessUserInvitationOutput> => {
	const { businessId, role, userId, clerkOrganizationId, email, clerkUserId } = args
	return await runTransaction(async (session) => {
		// Find business
		const business = await Business.findById(businessId)
		if (!business?._id) {
			throw new Error('Business not found')
		}
		if (!business.clerkOrganizationId) {
			throw new Error('Business does not have a linked Clerk organization')
		}

		// Verify clerkOrganizationId matches
		if (clerkOrganizationId && business.clerkOrganizationId !== clerkOrganizationId) {
			throw new Error('Organization ID mismatch')
		}

		// Check if user already exists in the business
		const existingBusinessUser = await BusinessUser.findOne({ businessId, userId })
		if (existingBusinessUser?._id) {
			throw new Error('User is already in the business')
		}

		// Verify the user exists
		const user = await User.findById(userId)
		if (!user?._id) {
			throw new Error('User not found')
		}
		if (user.clerkId !== clerkUserId) {
			throw new Error('User Clerk ID mismatch')
		}

		// Verify the organization exists in Clerk
		try {
			const org = await clerkClient.organizations.getOrganization({
				organizationId: business.clerkOrganizationId,
			})

			if (!org) {
				throw new Error(`Clerk organization ${business.clerkOrganizationId} not found`)
			}
		} catch (error) {
			console.error('Failed to fetch Clerk organization:', error)
			throw new Error(`Invalid Clerk organization ID: ${business.clerkOrganizationId}`)
		}

		// Add user to Clerk organization
		try {
			await clerkClient.organizations.createOrganizationMembership({
				organizationId: business.clerkOrganizationId,
				userId: clerkUserId,
				role: role === 'admin' ? 'org:admin' : 'org:member',
			})
		} catch (error) {
			console.error('Failed to add user to Clerk organization:', error)
			throw new Error('Failed to add user to organization')
		}

		// Create business user record in database
		const newBusinessUser = new BusinessUser({
			businessId,
			userId,
			role,
			status: 'active',
		})

		const savedBusinessUser = await newBusinessUser.save({ session })
		await BusinessUserInvitation.findOneAndDelete(
			{
				businessId,
				email,
			},
			{ session }
		)

		return savedBusinessUser
	})
}
