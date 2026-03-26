import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { createCallTransferToolByIdBodySchema, createCallTransferToolByIdParamsSchema } from './types'

export const createCallTransferToolByIdHandler = asyncHandler(async (request, reply) => {
	const params = createCallTransferToolByIdParamsSchema.parse(request.params)
	const body = createCallTransferToolByIdBodySchema.parse(request.body)
	const businessService = new BusinessService()
	const callTransferTool = await businessService.createCallTransferToolById(request, { ...params, ...body })

	return reply.status(200).send({
		success: true,
		message: 'Business Call Transfer Tool created successfully',
		data: callTransferTool,
	})
})
