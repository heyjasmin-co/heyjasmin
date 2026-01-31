import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'
import { signupBodySchema } from './types'

export const signupHandler = asyncHandler(async (request, reply) => {
	const body = signupBodySchema.parse(request.body)
	const superAdminService = new SuperAdminService()
	const data = await superAdminService.signup(request, body)

	return reply.status(201).send({
		success: true,
		...data,
	})
})
