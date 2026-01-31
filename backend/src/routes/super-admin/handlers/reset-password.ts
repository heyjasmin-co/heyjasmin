import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'
import { resetPasswordBodySchema } from './types'

export const resetPasswordHandler = asyncHandler(async (request, reply) => {
	const body = resetPasswordBodySchema.parse(request.body)
	const superAdminService = new SuperAdminService()
	const data = await superAdminService.resetPassword(request, body)

	return reply.status(200).send({
		success: true,
		...data,
	})
})
