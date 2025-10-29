import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { UpdateBusinessAssistantSetupByIdInput, UpdateBusinessAssistantSetupByIdOutput } from './types'

export const updateBusinessAssistantSetupById = async (
	request: FastifyRequest,
	args: UpdateBusinessAssistantSetupByIdInput
): Promise<UpdateBusinessAssistantSetupByIdOutput> => {
	const { businessId, assistantSetup } = args

	const updated = await Business.findByIdAndUpdate(
		businessId,
		{
			$set: {
				'aiAgentSettings.assistantSetup': assistantSetup,
			},
		},
		{ new: true }
	)

	if (!updated) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}

	return updated.aiAgentSettings
}
