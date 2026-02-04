import { FastifyRequest } from 'fastify'
import { SuperAdmin } from '../../../models/SuperAdmin'
import { signToken } from '../../../utils/auth'
import { SignupServiceInput, SignupServiceOutput } from './types'

export const signup = async (request: FastifyRequest, body: SignupServiceInput): Promise<SignupServiceOutput> => {
	const { email, password } = body
	const existing = await SuperAdmin.findOne({ email })
	if (existing) throw new Error('Email already exists')

	const admin = await SuperAdmin.create({ email, password })
	const token = signToken(admin.id, admin.email)

	return { token }
}
