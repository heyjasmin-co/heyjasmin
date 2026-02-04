import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'
import { deleteUserParamsSchema } from './types'

export const deleteUserHandler = asyncHandler(async (request, reply) => {
	const params = deleteUserParamsSchema.parse(request.params)
	const superAdminService = new SuperAdminService()
	const data = await superAdminService.deleteUser(request, params)

	return reply.status(200).send({
		success: true,
		...data,
	})
})
