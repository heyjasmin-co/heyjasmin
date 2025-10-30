import { asyncHandler } from '../../../utils/asyncHandler'
import { CallService } from '../services'
import { getCallsByBusinessIdParamsSchemaInput } from './types'

export const getCallsByBusinessIdHandler = asyncHandler(async (request, reply) => {
	const params = getCallsByBusinessIdParamsSchemaInput.parse(request.params)
	const callService = new CallService()
	const calls = await callService.getCallsByBusinessId(request, params)

	return reply.status(200).send({
		success: true,
		message: 'Business Calls fetch Successfully',
		data: calls,
	})
})
