import { FastifyRequest } from 'fastify'
import { Call } from '../../../models'
import { GetCallByIdInput, GetCallByIdOutput } from './types'

export const getCallById = async (request: FastifyRequest, args: GetCallByIdInput): Promise<GetCallByIdOutput> => {
	const { callId, businessId } = args

	const calls = await Call.findOne({ _id: callId, businessId: businessId })

	return calls
}
