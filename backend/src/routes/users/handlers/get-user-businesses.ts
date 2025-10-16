import { asyncHandler } from '../../../utils/asyncHandler'
import { UserService } from '../services'

export const getUserBusinessesHandler = asyncHandler(async (request, reply) => {
	const userService = new UserService()
	const userBusinesses = await userService.getUserBusinesses(request)

	return reply.status(200).send({
		success: true,
		message: 'User Businesses fetch Successfully',
		data: userBusinesses,
	})
})
