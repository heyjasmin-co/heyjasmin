import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'
import { getUsersQuerySchema } from './types'

export const getUsersHandler = asyncHandler(async (request, reply) => {
	const query = getUsersQuerySchema.parse(request.query)
	const superAdminService = new SuperAdminService()
	const data = await superAdminService.getUsers(query)

	return reply.status(200).send({
		success: true,
		...data,
	})
})
