import { asyncHandler } from '../../../utils/asyncHandler'
import { UserService } from '../services'

export const meHandler = asyncHandler(async (request, reply) => {
	const userService = new UserService()
	const user = await userService.me(request)

	return reply.status(200).send({
		success: true,
		message: 'User data retrieved successfully',
		data: user,
	})
})
