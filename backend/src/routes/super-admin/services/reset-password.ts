import crypto from 'crypto'
import { FastifyRequest } from 'fastify'
import { SuperAdmin } from '../../../models/SuperAdmin'
import { ResetPasswordServiceInput, ResetPasswordServiceOutput } from './types'

export const resetPassword = async (request: FastifyRequest, body: ResetPasswordServiceInput): Promise<ResetPasswordServiceOutput> => {
	const { token, newPassword, id } = body

	if (!token || !newPassword || !id) throw new Error('Token, new password, and adminId are required')

	// Hash the token to match stored hash
	const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

	// Find admin by ID and token
	const admin = await SuperAdmin.findOne({
		_id: id,
		resetPasswordToken: hashedToken,
		resetPasswordExpires: { $gt: Date.now() }, // token still valid
	})

	if (!admin) throw new Error('Invalid or expired token')

	// Update password & clear token
	admin.password = newPassword
	admin.resetPasswordToken = undefined
	admin.resetPasswordExpires = undefined
	await admin.save()

	return { message: 'Password reset successful' }
}
