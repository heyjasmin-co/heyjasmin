// Avoid importing SDK types directly to prevent type-resolution issues; use local 'any' types for external resources.
import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { updateAIAssistant } from '../../../services/vapi.service'
import { UpdateBusinessAssistantByIdInput, UpdateBusinessAssistantByIdOutput } from './types'

export const updateBusinessAssistantById = async (
	request: FastifyRequest,
	args: UpdateBusinessAssistantByIdInput
): Promise<UpdateBusinessAssistantByIdOutput> => {
	const { businessId } = args

	const updated = await Business.findById(businessId)
	if (!updated) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}

	await updateAIAssistant(
		{
			businessName: updated?.name,
			services: updated?.services,
			businessHours: updated?.businessHours,
		},
		updated?.aiAgentSettings.assistantId!
	)

	return updated
}
