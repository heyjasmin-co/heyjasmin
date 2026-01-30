import { FastifyRequest } from 'fastify'
import { ClientSession } from 'mongoose'
import config from '../config'
import clerkClient from '../config/clerk'
import transporter from '../config/nodemailer'
import { Business, BusinessUser, User } from '../models'
import { BusinessUserInvitation } from '../models/BusinessUserInvitation'
import { validateAndCreateBusinessMemberUser } from '../routes/business-user-invitations/services/accept-business-user-invitation-id'
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

export const handleUserCreated = async (request: FastifyRequest, clerkUser: any, session: ClientSession) => {
	// const clerkUserId: string | null = null
	// let clerkOrgId: string | null = null

	try {
		const userData = {
			clerkId: clerkUser.id,
			email: clerkUser.email_addresses[0]?.email_address,
			firstName: clerkUser.first_name,
			lastName: clerkUser.last_name,
			profileImage: clerkUser.has_image ? clerkUser.image_url : '',
		}
		const unsafeMetadata = clerkUser.unsafe_metadata
		// Create local user
		const user = new User(userData)
		const savedUser = await user.save({ session })

		//Store User in Business
		const businessId = unsafeMetadata?.businessId
		const invitationToken = unsafeMetadata?.invitationToken
		console.log('businessId', businessId)
		console.log('invitationToken', invitationToken)
		if (businessId && !invitationToken) {
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
			await businessMember.save({ session })
			// update user metadata
			await clerkClient.users.updateUserMetadata(savedUser.clerkId, {
				publicMetadata: {
					dbUserId: savedUser._id,
					clerkId: savedUser.clerkId,
					businessId: businessId,
					role: 'owner',
					selectedClientId: null,
				},
			})
			request.log.info('Business member created for user ' + savedUser.email)
		}

		if (invitationToken) {
			await validateAndCreateBusinessMemberUser({ invitationToken, userId: (savedUser._id as any).toString(), session })
			request.log.info('Business member accepted invitation for user ' + savedUser.email)
		} else {
			const registerTemplate = welcomeAfterVerificationTemplate(userData.firstName + ' ' + userData.lastName, userData.email)
			const newUserTemplate = newUserNotificationTemplate(userData.firstName + ' ' + userData.lastName, userData.email)
			await Promise.all([
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
			request.log.info('Welcome email and new user email sent to user ' + savedUser.email)
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
	await clerkClient.users.updateUserMetadata(user_id, {
		publicMetadata: {
			businessId,
			role,
		},
	})
	return {
		success: true,
		data: findUserByClerkId,
		businessUser,
	}
}
