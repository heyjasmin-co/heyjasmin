import { asyncHandler } from '../../../utils/asyncHandler'
import { CallService } from '../services'
import { getCallByIdParamsSchemaInput, getCallByIdQuerySchemaInput } from './types'

export const getCallByIdHandler = asyncHandler(async (request, reply) => {
	const params = getCallByIdParamsSchemaInput.parse(request.params)
	const query = getCallByIdQuerySchemaInput.parse(request.query)
	const callService = new CallService()
	const calls = await callService.getCallById(request, { ...query, ...params })

	return reply.status(200).send({
		success: true,
		message: 'Business Call fetch Successfully',
		data: calls,
	})
})
