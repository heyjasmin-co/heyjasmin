import { ClientSession } from 'mongoose'
import config from '../config'
import clerkClient from '../config/clerk'
import transporter from '../config/nodemailer'
import { Business, BusinessUser, User } from '../models'
import { BusinessUserInvitation } from '../models/BusinessUserInvitation'
import { newUserNotificationTemplate } from '../template/newUserTemplate'
import { welcomeAfterVerificationTemplate } from '../template/registerTemplate'
type ClerkOrganizationInvitationAccepted = {
	created_at: number
	email_address: string
	expires_at: number
	id: string
	object: 'organization_invitation'
	organization_id: string
	private_metadata: Record<string, any>
	public_metadata: {
		businessId: string
		eventType: string
		role: string
		[key: string]: any
	}
	role: string
	role_name: string
	status: 'accepted'
	updated_at: number
	url: string
	user_id: string
}

export const handleUserCreated = async (clerkUser: any, session: ClientSession) => {
	try {
		const userData = {
			clerkId: clerkUser.id,
			email: clerkUser.email_addresses[0]?.email_address,
			firstName: clerkUser.first_name,
			lastName: clerkUser.last_name,
			profileImage: clerkUser.has_image ? clerkUser.image_url : '',
		}
		// Create local user
		const user = new User(userData)
		const savedUser = await user.save({ session })

		//Store User in Business
		const businessId = clerkUser.unsafe_metadata.businessId
		if (businessId) {
			const business = await Business.findById(businessId).session(session)
			if (!business) {
				throw new Error(`Business not found with id: ${businessId}`)
			}
			// Create BusinessUser (owner)
			const businessMember = new BusinessUser({
				userId: savedUser._id,
				businessId: businessId,
				role: 'owner',
				status: 'active',
			})
			const registerTemplate = welcomeAfterVerificationTemplate(userData.firstName + ' ' + userData.lastName, userData.email)
			const newUserTemplate = newUserNotificationTemplate(userData.firstName + ' ' + userData.lastName, userData.email)

			// Create Clerk organization + update metadata
			const [org] = await Promise.all([
				clerkClient.organizations.createOrganization({
					name: business.name,
					createdBy: savedUser.clerkId,
				}),
				clerkClient.users.updateUserMetadata(savedUser.clerkId, {
					publicMetadata: {
						dbUserId: savedUser._id,
						clerkId: savedUser.clerkId,
						businessId: businessId,
						role: 'owner',
						selectedClientId: null,
					},
				}),
				transporter.sendMail({
					from: config.NODEMAILER_EMAIL_USER,
					to: userData.email,
					subject: 'Welcome to heyjasmin 🎉',
					html: registerTemplate,
				}),
				transporter.sendMail({
					from: config.NODEMAILER_EMAIL_USER,
					to: config.NODEMAILER_EMAIL_USER,
					subject: 'New User Onboard to heyjasmin 🎉',
					html: newUserTemplate,
				}),
			])

			// Update Business with Clerk Organization ID
			business.clerkOrganizationId = org.id
			await business.save({ session })

			// Save business membership
			await businessMember.save({ session })

			// Final metadata update (optional but clean)
			await clerkClient.users.updateUser(savedUser.clerkId, {
				publicMetadata: {
					businessId: businessId,
					role: 'owner',
				},
			})
		}

		return {
			success: true,
			data: savedUser,
		}
	} catch (error) {
		console.error('Error creating user from webhook:', error)
		throw new Error('Failed to create user from webhook')
	}
}

export const handleBusinessUserCreated = async (args: any, session: ClientSession) => {
	try {
		const { user, data } = args
		const businessUser = new BusinessUser({
			businessId: data.public_metadata.businessId,
			userId: user.data._id,
			role: data.public_metadata.role,
			status: 'active',
		})

		await businessUser.save({ session })
		await BusinessUserInvitation.deleteOne(
			{
				businessId: data.public_metadata.businessId,
				email: user.data.email,
			},
			{ session }
		)

		return {
			success: true,
			data: user,
		}
	} catch (error) {
		console.error('Error creating user from webhook:', error)
		throw new Error('Failed to create user from webhook')
	}
}
export const handleBusinessUserInvitationCreated = async (args: ClerkOrganizationInvitationAccepted, session: ClientSession) => {
	const { user_id, public_metadata, id: invitationId, email_address, organization_id } = args

	// Validate that this is a business invitation
	if (public_metadata?.eventType !== 'business-invitation') {
		throw new Error('Not a business invitation event')
	}

	const { businessId, role } = public_metadata

	// Find user by Clerk ID
	const findUserByClerkId = await User.findOne({
		clerkId: user_id,
	}).session(session)

	if (!findUserByClerkId) {
		throw new Error(`User not found with clerkId: ${user_id}`)
	}

	// Create business user
	const businessUser = new BusinessUser({
		businessId,
		userId: findUserByClerkId._id,
		role,
		status: 'active',
	})

	await businessUser.save({ session })

	await BusinessUserInvitation.findOneAndDelete(
		{
			clerkInvitationId: invitationId,
		},
		{ session }
	)

	return {
		success: true,
		data: findUserByClerkId,
		businessUser,
	}
}
