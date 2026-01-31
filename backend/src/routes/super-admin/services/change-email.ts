import crypto from 'crypto'
import { FastifyRequest } from 'fastify'
import config from '../../../config'
import transporter from '../../../config/nodemailer'
import { SuperAdmin } from '../../../models/SuperAdmin'
import { verifyEmailChangeTemplate } from '../../../template/verifyEmailChangeTemplate'
import { ChangeEmailServiceInput, ChangeEmailServiceOutput } from './types'

export const changeEmail = async (request: FastifyRequest, body: ChangeEmailServiceInput): Promise<ChangeEmailServiceOutput> => {
	const { newEmail, password } = body
	// @ts-ignore
	const userId = request.user.id
	const admin = await SuperAdmin.findById(userId)
	if (!admin) throw new Error('User not found')

	const isMatch = await admin.comparePassword(password)
	if (!isMatch) throw new Error('Incorrect password')

	// Generate verification token
	const emailChangeToken = crypto.randomBytes(20).toString('hex')
	const hashedToken = crypto.createHash('sha256').update(emailChangeToken).digest('hex')

	admin.pendingEmail = newEmail
	admin.emailChangeToken = hashedToken
	admin.emailChangeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours expiry
	await admin.save()

	const verifyUrl = `${process.env.FRONTEND_URL}/super-admin/auth/verify-email-change?token=${emailChangeToken}&id=${admin._id}`
	const emailTemplate = verifyEmailChangeTemplate({
		verifyUrl,
		newEmail,
	})

	await transporter.sendMail({
		from: config.NODEMAILER_EMAIL_USER,
		to: admin.email, // Send to CURRENT email
		subject: 'Verify Your Email Change',
		html: emailTemplate,
	})

	request.log.info(`Verification email sent to ${admin.email} for changing to ${newEmail}`)
	return { message: 'Verification email sent to your current email address', token: '' }
}
