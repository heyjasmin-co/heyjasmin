import { FastifyRequest } from 'fastify'
import { Call } from '../../../models'
import { GetCallsByBusinessIdInput, GetCallsByBusinessIdOutput } from './types'

export const getCallsByBusinessId = async (
	request: FastifyRequest,
	args: GetCallsByBusinessIdInput
): Promise<GetCallsByBusinessIdOutput> => {
	const { businessId } = args

	const calls = await Call.find({ businessId: businessId }).sort({ createdAt: -1 })

	return calls
}
