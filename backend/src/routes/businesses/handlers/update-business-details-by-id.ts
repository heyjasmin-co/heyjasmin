import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { updateBusinessDetailsByIdBodySchema, updateBusinessDetailsByIdParamsSchema } from './types'

export const updateBusinessDetailsByIdHandler = asyncHandler(async (request, reply) => {
	const params = updateBusinessDetailsByIdParamsSchema.parse(request.params)
	const body = updateBusinessDetailsByIdBodySchema.parse(request.body)
	const businessService = new BusinessService()
	const businessDetails = await businessService.updateBusinessDetailsById(request, { ...body, ...params })

	return reply.status(200).send({
		success: true,
		message: 'Businesses Details updated Successfully',
		data: businessDetails,
	})
})
