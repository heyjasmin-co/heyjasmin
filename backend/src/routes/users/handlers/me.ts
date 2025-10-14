import { asyncHandler } from '../../../utils/asyncHandler'
import { UserService } from '../services'

export const meHandler = asyncHandler(async (request, reply) => {
	const userService = new UserService()
	const clerkId = (request as any).context?.clerkId
	if (!clerkId) {
		return reply.status(401).send({
			success: false,
			error: 'Authentication required',
		})
	}
	const user = await userService.me(request)

	return reply.status(200).send({
		success: true,
		data: user,
	})
})
