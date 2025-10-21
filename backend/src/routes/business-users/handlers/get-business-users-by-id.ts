import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessUsersService } from '../services'
import { getBusinessUsersByIdParamsSchema } from './types'

export const getBusinessUsersByIdHandler = asyncHandler(async (request, reply) => {
	const params = getBusinessUsersByIdParamsSchema.parse(request.params)
	const businessUsersService = new BusinessUsersService()
	const businessUsers = await businessUsersService.getBusinessUsersById(request, params)

	return reply.status(200).send({
		success: true,
		message: 'Businesses Users fetch Successfully',
		data: businessUsers,
	})
})
