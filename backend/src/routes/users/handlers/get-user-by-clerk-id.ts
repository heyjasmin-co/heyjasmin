import { asyncHandler } from '../../../utils/asyncHandler'
import { UserService } from '../services'
import { getUserByClerkIdParamsSchema } from './types'

export const getUserByClerkIdHandler = asyncHandler(async (request, reply) => {
	const params = getUserByClerkIdParamsSchema.parse(request.params)
	const userService = new UserService()
	const user = await userService.getUserByClerkId(params)

	if (!user) {
		return reply.status(404).send({
			success: false,
			error: 'User not found',
		})
	}

	return reply.status(200).send({
		success: true,
		data: user,
	})
})
