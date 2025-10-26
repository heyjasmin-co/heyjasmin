import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { updateBusinessHoursByIdBodySchema, updateBusinessHoursByIdParamsSchema } from './types'

export const updateBusinessHoursByIdHandler = asyncHandler(async (request, reply) => {
	const params = updateBusinessHoursByIdParamsSchema.parse(request.params)
	const body = updateBusinessHoursByIdBodySchema.parse(request.body)
	const businessService = new BusinessService()
	const updated = await businessService.updateBusinessHoursById(request, { ...body, ...params })

	return reply.status(200).send({
		success: true,
		message: 'Business hours updated successfully',
		data: updated,
	})
})
