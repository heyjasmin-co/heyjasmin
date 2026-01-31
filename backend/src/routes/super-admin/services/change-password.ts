import { FastifyRequest } from 'fastify'
import { SuperAdmin } from '../../../models/SuperAdmin'
import { ChangePasswordServiceInput, ChangePasswordServiceOutput } from './types'

export const changePassword = async (request: FastifyRequest, body: ChangePasswordServiceInput): Promise<ChangePasswordServiceOutput> => {
	const { currentPassword, newPassword } = body
	// @ts-ignore
	const userId = request.user.id
	const admin = await SuperAdmin.findById(userId)
	if (!admin) throw new Error('User not found')

	const isMatch = await admin.comparePassword(currentPassword)
	if (!isMatch) throw new Error('Incorrect current password')

	admin.password = newPassword
	await admin.save()

	return { message: 'Password updated' }
}
