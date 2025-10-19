import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { updateBusinessServicesByIdBodySchema, updateBusinessServicesByIdParamsSchema } from './types'

export const updateBusinessServicesByIdHandler = asyncHandler(async (request, reply) => {
	const params = updateBusinessServicesByIdParamsSchema.parse(request.params)
	const body = updateBusinessServicesByIdBodySchema.parse(request.body)
	const businessService = new BusinessService()
	const services = await businessService.updateBusinessServicesById(request, { ...body, ...params })

	return reply.status(200).send({
		success: true,
		message: 'Business services updated successfully',
		data: services,
	})
})
