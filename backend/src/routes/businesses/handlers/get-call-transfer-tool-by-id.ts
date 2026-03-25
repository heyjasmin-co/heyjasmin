import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { getCallTransferToolByIdParamsSchema } from './types'

export const getCallTransferToolByIdHandler = asyncHandler(async (request, reply) => {
	const params = getCallTransferToolByIdParamsSchema.parse(request.params)
	const businessService = new BusinessService()
	const callTransferTool = await businessService.getCallTransferToolById(request, params)

	return reply.status(200).send({
		success: true,
		message: 'Business Call Transfer Tool fetched successfully',
		data: callTransferTool,
	})
})
