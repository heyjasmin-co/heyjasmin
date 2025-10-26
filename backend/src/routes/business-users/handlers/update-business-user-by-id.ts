import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessUsersService } from '../services'
import { updateBusinessUserByIdBodySchema, updateBusinessUserByIdParamsSchema } from './types'

export const updateBusinessUsersByIdHandler = asyncHandler(async (request, reply) => {
	const params = updateBusinessUserByIdParamsSchema.parse(request.params)
	const body = updateBusinessUserByIdBodySchema.parse(request.body)
	const businessUsersService = new BusinessUsersService()
	const businessUsers = await businessUsersService.updateBusinessUsersById(request, { ...params, ...body })

	return reply.status(200).send({
		success: true,
		message: 'Business User updated Successfully',
		data: businessUsers,
	})
})
