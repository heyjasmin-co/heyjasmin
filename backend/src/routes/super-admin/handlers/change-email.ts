import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'
import { changeEmailBodySchema } from './types'

export const changeEmailHandler = asyncHandler(async (request, reply) => {
	const body = changeEmailBodySchema.parse(request.body)
	const superAdminService = new SuperAdminService()
	const data = await superAdminService.changeEmail(request, body)

	return reply.status(200).send({
		success: true,
		...data,
	})
})
