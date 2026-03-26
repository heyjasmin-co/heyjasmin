import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { updateCallTransferToolByIdBodySchema, updateCallTransferToolByIdParamsSchema } from './types'

export const updateCallTransferToolByIdHandler = asyncHandler(async (request, reply) => {	
	const params = updateCallTransferToolByIdParamsSchema.parse(request.params)
	const body = updateCallTransferToolByIdBodySchema.parse(request.body)
	const businessService = new BusinessService()
	const callTransferTool = await businessService.updateCallTransferToolById(request, { ...params, ...body })

	return reply.status(200).send({
		success: true,
		message: 'Business Call Transfer Tool updated successfully',
		data: callTransferTool,
	})
})
