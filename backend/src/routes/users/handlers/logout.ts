import { asyncHandler } from '../../../utils/asyncHandler'
import { UserService } from '../services'

export const logoutHandler = asyncHandler(async (request, reply) => {
	const userService = new UserService()

	await userService.logout(request)

	return reply.code(200).send({
		success: true,
		message: 'User is logged out',
	})
})
