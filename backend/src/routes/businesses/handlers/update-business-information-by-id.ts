import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { updateBusinessInformationByIdBodySchema, updateBusinessInformationByIdParamsSchema } from './types'

export const updateBusinessInformationByIdHandler = asyncHandler(async (request, reply) => {
	const params = updateBusinessInformationByIdParamsSchema.parse(request.params)
	const body = updateBusinessInformationByIdBodySchema.parse(request.body)
	const businessService = new BusinessService()
	const businessInformation = await businessService.updateBusinessInformationById(request, { ...body, ...params })

	return reply.status(200).send({
		success: true,
		message: 'Businesses Information updated Successfully',
		data: businessInformation,
	})
})
