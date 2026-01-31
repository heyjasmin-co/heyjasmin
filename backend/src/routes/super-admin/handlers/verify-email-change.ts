import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'
import { verifyEmailChangeBodySchema } from './types'

export const verifyEmailChangeHandler = asyncHandler(async (request, reply) => {
	const body = verifyEmailChangeBodySchema.parse(request.body)
	const superAdminService = new SuperAdminService()
	const data = await superAdminService.verifyEmailChange(request, body)

	return reply.status(200).send({
		success: true,
		...data,
	})
})
