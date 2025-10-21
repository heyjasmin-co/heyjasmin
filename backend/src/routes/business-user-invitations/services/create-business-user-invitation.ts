import { clerkClient, OrganizationInvitation } from '@clerk/fastify'
import { FastifyRequest } from 'fastify'
import config from '../../../config'
import { Business, User } from '../../../models'
import { BusinessUserInvitation } from '../../../models/BusinessUserInvitation'
import { CreateBusinessUserInvitationInput, CreateBusinessUserInvitationOutput } from './types'

export const createBusinessUserInvitationById = async (
	request: FastifyRequest,
	args: CreateBusinessUserInvitationInput
): Promise<CreateBusinessUserInvitationOutput> => {
	const { businessId, email, role } = args

	// Find business
	const business = await Business.findById(businessId)
	if (!business?._id) {
		throw new Error('Business not found')
	}
	if (!business.clerkOrganizationId) {
		throw new Error('Business does not have a linked Clerk organization')
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

	//
	const clerkAccount = await clerkClient.users.getUserList({
		emailAddress: [email],
	})
	const clerkUserId = clerkAccount.data[0].id
	const dbUser = await User.findOne({ clerkId: clerkUserId })
	if (!dbUser) {
		throw new Error(`User not found in database for Clerk ID: ${clerkUserId}`)
	}

	//
	let redirectUrl = `${config.frontend_url}/admin/sign-up`
	if (clerkAccount.data.length > 0) {
		redirectUrl = `${config.frontend_url}/admin/join-organization?userId=${dbUser._id}&clerkUserId=${clerkUserId}&businessId=${business._id}&businessName=${business.name}&email=${email}&clerkOrganizationId=${business.clerkOrganizationId}&role=${role}`
	}

	let response: OrganizationInvitation | null = null
	try {
		// Create invitation
		response = await clerkClient.organizations.createOrganizationInvitation({
			organizationId: business.clerkOrganizationId,
			emailAddress: email,
			role: role === 'admin' ? 'org:admin' : 'org:member',
			redirectUrl: redirectUrl,
			publicMetadata: {
				businessId: businessId.toString(),
				role: role,
				eventType: 'business-invitation',
			},
		})
	} catch (error) {
		console.error('Failed to create Clerk invitation:', error)
		throw new Error('Failed to create organization invitation')
	}

	if (!response) {
		throw new Error('Invitation not sent')
	}

	// Save to database
	const businessUserInvitation = new BusinessUserInvitation({
		businessId,
		email,
		role,
		clerKInvitationId: response.id,
		status: 'pending',
	})

	const invitation = await businessUserInvitation.save()
	return invitation
}
