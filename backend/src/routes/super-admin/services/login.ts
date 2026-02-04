import { FastifyRequest } from 'fastify'
import { SuperAdmin } from '../../../models/SuperAdmin'
import { signToken } from '../../../utils/auth'
import { LoginServiceInput, LoginServiceOutput } from './types'

export const login = async (request: FastifyRequest, body: LoginServiceInput): Promise<LoginServiceOutput> => {
	const { email, password } = body
	const admin = await SuperAdmin.findOne({ email })
	if (!admin) throw new Error('Invalid credentials')

	const isMatch = await admin.comparePassword(password)
	if (!isMatch) throw new Error('Invalid credentials')

	const token = signToken(admin.id, admin.email)
	return { token }
}
