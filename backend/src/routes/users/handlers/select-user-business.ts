import { asyncHandler } from '../../../utils/asyncHandler'
import { UserService } from '../services'
import { selectUserBusinessBodySchema, selectUserBusinessParamsSchema } from './types'

export const selectUserBusinessHandler = asyncHandler(async (request, reply) => {
	const params = selectUserBusinessParamsSchema.parse(request.params)
	const body = selectUserBusinessBodySchema.parse(request.body)
	const userService = new UserService()
	await userService.selectUserBusiness(request, { ...body, ...params })

	return reply.status(200).send({
		success: true,
		message: 'User Business selected Successfully',
	})
})
