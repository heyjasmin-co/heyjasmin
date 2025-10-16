import { asyncHandler } from '../../../utils/asyncHandler'
import { UserService } from '../services'
import { selectUserBusinessSchema } from './types'

export const selectUserBusinessHandler = asyncHandler(async (request, reply) => {
	const body = selectUserBusinessSchema.parse(request.body)
	const userService = new UserService()
	await userService.selectUserBusiness( request, body )

	return reply.status(200).send({
		success: true,
		message: 'User Business selected Successfully',
	})
})
