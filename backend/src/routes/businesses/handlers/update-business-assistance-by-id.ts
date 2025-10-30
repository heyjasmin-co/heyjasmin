import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { updateBusinessAssistantByIdParamsSchema } from './types'

export const updateBusinessAssistantByIdHandler = asyncHandler(async (request, reply) => {
	const params = updateBusinessAssistantByIdParamsSchema.parse(request.params)
	const businessService = new BusinessService()
	const assistant = await businessService.updateBusinessAssistantById(request, params)

	return reply.status(200).send({
		success: true,
		message: 'Business Assistant updated successfully',
		data: assistant,
	})
})
