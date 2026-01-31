import crypto from 'crypto'
import { FastifyRequest } from 'fastify'
import config from '../../../config'
import transporter from '../../../config/nodemailer'
import { SuperAdmin } from '../../../models/SuperAdmin'
import { adminResetPasswordTemplate } from '../../../template/resetAdminPasswordTemplate'
import { ForgotPasswordServiceInput, ForgotPasswordServiceOutput } from './types'

export const forgotPassword = async (request: FastifyRequest, body: ForgotPasswordServiceInput): Promise<ForgotPasswordServiceOutput> => {
	const { email } = body

	const admin = await SuperAdmin.findOne({ email })
	if (!admin) throw new Error('User not found')

	let resetToken: string

	// Check if a valid token already exists
	if (admin.resetPasswordToken && admin.resetPasswordExpires && admin.resetPasswordExpires > new Date()) {
		resetToken = admin.resetPasswordToken
	} else {
		// Generate new token
		resetToken = crypto.randomBytes(20).toString('hex')
		admin.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
		admin.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry
		await admin.save()
	}

	const resetPasswordUrl = `${process.env.FRONTEND_URL}/super-admin/auth/reset-password?token=${resetToken}&id=${admin._id}`
	const resetPasswordTemplate = adminResetPasswordTemplate({
		resetPasswordUrl,
		expiresAt: admin.resetPasswordExpires!,
	})

	await transporter.sendMail({
		from: config.NODEMAILER_EMAIL_USER,
		to: admin.email,
		subject: 'Admin Password Reset',
		html: resetPasswordTemplate,
	})

	request.log.info('Password reset email sent to ' + admin.email)
	return { message: 'Password reset email sent successfully' }
}
