import crypto from 'crypto'
import { FastifyRequest } from 'fastify'
import config from '../../../config'
import transporter from '../../../config/nodemailer'
import { Business, BusinessUser, User } from '../../../models'
import { BusinessUserInvitation } from '../../../models/BusinessUserInvitation'
import { sendInviteToNewUserTemplate } from '../../../template/sendInviteToNewUserTemplate'
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

	// Check if user already exists
	const existingUser = await User.findOne({ email })

	// If user exists, check if they are already a member of the business
	if (existingUser) {
		const existingMembership = await BusinessUser.findOne({
			businessId,
			userId: existingUser._id,
			status: 'active', // only consider active members
		})

		if (existingMembership) {
			throw new Error('User is already an active member of this business')
		}
	}

	// Check if invitation already exists and is pending
	const existingInvitation = await BusinessUserInvitation.findOne({
		businessId,
		email,
		status: 'pending',
	})

	if (existingInvitation) {
		throw new Error('An invitation is already pending for this email')
	}

	// Generate unique invitation token
	const invitationToken = crypto.randomBytes(32).toString('hex')
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days expiry

	// Create invitation in database
	const businessUserInvitation = new BusinessUserInvitation({
		businessId,
		email,
		role,
		invitationToken,
		expiresAt,
		status: 'pending',
	})

	const invitation = await businessUserInvitation.save()
	
	// Build invitation URL
	let invitationUrl: string

	if (existingUser) {
		// User exists - direct them to accept invitation page
		invitationUrl = `${config.FRONTEND_URL}/admin/accept-invitation?invitationToken=${invitationToken}&userId=${existingUser._id}`
	} else {
		// New user - direct them to sign up with invitation
		invitationUrl = `${config.FRONTEND_URL}/admin/sign-up?invitationToken=${invitationToken}&email=${encodeURIComponent(email)}`
	}

	// Send invitation email
	try {
		const newInviteTemplate = sendInviteToNewUserTemplate({
			businessName: business.name,
			email,
			invitationUrl,
			role: role.charAt(0).toUpperCase() + role.slice(1),
			expiresAt,
		})
		await transporter.sendMail({
			from: config.NODEMAILER_EMAIL_USER,
			to: email,
			subject: 'You have been invited to join heyjasmin 🎉',
			html: newInviteTemplate,
		})
	} catch (error) {
		console.error('Failed to send invitation email:', error)
		// Optionally delete the invitation if email fails
		await BusinessUserInvitation.findByIdAndDelete(invitation._id)
		throw new Error('Failed to send invitation email')
	}
	request.log.info('Business user invitation created successfully')
	return invitation
}
