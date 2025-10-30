import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { updateBusinessAssistantSetupByIdBodySchema, updateBusinessAssistantSetupByIdParamsSchema } from './types'

export const updateBusinessAssistantSetupByIdHandler = asyncHandler(async (request, reply) => {
	const params = updateBusinessAssistantSetupByIdParamsSchema.parse(request.params)
	const body = updateBusinessAssistantSetupByIdBodySchema.parse(request.body)
	const businessService = new BusinessService()
	const assistantSetup = await businessService.updateBusinessAssistantSetupById(request, { ...body, ...params })

	return reply.status(200).send({
		success: true,
		message: 'Business Assistant Setup updated successfully',
		data: assistantSetup,
	})
})
