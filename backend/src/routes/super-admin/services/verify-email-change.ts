import crypto from 'crypto'
import { FastifyRequest } from 'fastify'
import { SuperAdmin } from '../../../models/SuperAdmin'
import { signToken } from '../../../utils/auth'
import { VerifyEmailChangeServiceInput, VerifyEmailChangeServiceOutput } from './types'

export const verifyEmailChange = async (
	request: FastifyRequest,
	body: VerifyEmailChangeServiceInput
): Promise<VerifyEmailChangeServiceOutput> => {
	const { token, id } = body

	if (!token || !id) throw new Error('Token and ID are required')

	const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

	const admin = await SuperAdmin.findOne({
		_id: id,
		emailChangeToken: hashedToken,
		emailChangeExpires: { $gt: Date.now() },
	})

	if (!admin) throw new Error('Invalid or expired verification link')

	if (!admin.pendingEmail) throw new Error('No pending email change found')

	// Apply the change
	admin.email = admin.pendingEmail
	admin.pendingEmail = undefined
	admin.emailChangeToken = undefined
	admin.emailChangeExpires = undefined
	await admin.save()

	// Issue a new token with the updated email
	const newToken = signToken(admin.id, admin.email)

	request.log.info(`Email successfully changed for admin ID: ${admin._id} to ${admin.email}`)
	return { message: 'Email updated successfully', token: newToken }
}
