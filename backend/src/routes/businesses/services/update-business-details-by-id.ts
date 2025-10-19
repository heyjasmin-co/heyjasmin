import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { UpdateBusinessDetailsByIdInput, UpdateBusinessDetailsByIdOutput } from './types'

export const updateBusinessDetailsById = async (
	request: FastifyRequest,
	args: UpdateBusinessDetailsByIdInput
): Promise<UpdateBusinessDetailsByIdOutput> => {
	const { businessId, ...updateData } = args
	//TODO: AGENT WORK
	const updateBusinessDetails = await Business.findByIdAndUpdate(
		businessId,
		{
			$set: {
				...updateData,
				aiAgentSettings: {
					agentId: 'Testing-Id',
					agentNumber: 'Testing-Number',
				},
			},
		},
		{ new: true }
	)
	if (!updateBusinessDetails) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}
	return updateBusinessDetails
}
