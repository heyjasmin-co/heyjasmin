import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'
import { forgotPasswordBodySchema } from './types'

export const forgotPasswordHandler = asyncHandler(async (request, reply) => {
	const body = forgotPasswordBodySchema.parse(request.body)
	const superAdminService = new SuperAdminService()
	const data = await superAdminService.forgotPassword(request, body)

	return reply.status(200).send({
		success: true,
		...data,
	})
})
