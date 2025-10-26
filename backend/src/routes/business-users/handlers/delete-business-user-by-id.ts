import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessUsersService } from '../services'
import { deleteBusinessUserByIdParamsSchema } from './types'

export const deleteBusinessUserByIdHandler = asyncHandler(async (request, reply) => {
	const params = deleteBusinessUserByIdParamsSchema.parse(request.params)
	const businessUsersService = new BusinessUsersService()
	const businessUsers = await businessUsersService.deleteBusinessUserById(request, params)

	return reply.status(200).send({
		success: true,
		message: 'Business User deleted Successfully',
		data: businessUsers,
	})
})
