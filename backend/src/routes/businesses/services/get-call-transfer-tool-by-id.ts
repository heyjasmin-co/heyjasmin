import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { GetCallTransferToolByIdInput, GetCallTransferToolByIdOutput } from './types'

export const getCallTransferToolById = async (
	request: FastifyRequest,
	args: GetCallTransferToolByIdInput
): Promise<GetCallTransferToolByIdOutput> => {
	const { businessId } = args

	const business = await Business.findById(businessId)
	if (!business) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}

	return business.callTransferSettings.scenarios
}
