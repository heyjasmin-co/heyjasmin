import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'
import { deleteBusinessParamsSchema } from './types'

export const deleteBusinessAndUserHandler = asyncHandler(async (request, reply) => {
	const params = deleteBusinessParamsSchema.parse(request.params)
	const superAdminService = new SuperAdminService()
	const data = await superAdminService.deleteBusinessAndUser(request, params)

	return reply.status(200).send({
		success: true,
		...data,
	})
})
