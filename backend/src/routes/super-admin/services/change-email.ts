import { FastifyRequest } from 'fastify'
import { SuperAdmin } from '../../../models/SuperAdmin'
import { signToken } from '../../../utils/auth'
import { ChangeEmailServiceInput, ChangeEmailServiceOutput } from './types'

export const changeEmail = async (request: FastifyRequest, body: ChangeEmailServiceInput): Promise<ChangeEmailServiceOutput> => {
	const { newEmail, password } = body
	// @ts-ignore
	const userId = request.user.id
	const admin = await SuperAdmin.findById(userId)
	if (!admin) throw new Error('User not found')

	const isMatch = await admin.comparePassword(password)
	if (!isMatch) throw new Error('Incorrect password')

	admin.email = newEmail
	await admin.save()

	const token = signToken(admin.id, admin.email)
	return { message: 'Email updated', token }
}
