import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'
import { changePasswordBodySchema } from './types'

export const changePasswordHandler = asyncHandler(async (request, reply) => {
	const body = changePasswordBodySchema.parse(request.body)
	const superAdminService = new SuperAdminService()
	const data = await superAdminService.changePassword(request, body)

	return reply.status(200).send({
		success: true,
		...data,
	})
})
