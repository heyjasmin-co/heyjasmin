import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { getBusinessDetailsByIdParamsSchema } from './types'

export const getBusinessDetailsByIdHandler = asyncHandler(async (request, reply) => {
	const params = getBusinessDetailsByIdParamsSchema.parse(request.params)
	const businessService = new BusinessService()
	const businessDetails = await businessService.getBusinessDetailsById(request,params)

	return reply.status(200).send({
		success: true,
		message: 'Businesses Details fetch Successfully',
		data: businessDetails,
	})
})
