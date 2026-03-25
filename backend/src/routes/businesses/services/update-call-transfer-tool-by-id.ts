import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { updateCallTransferTool } from '../../../services/vapi.service'
import { UpdateCallTransferToolByIdInput, UpdateCallTransferToolByIdOutput } from './types'

export const updateCallTransferToolById = async (
	request: FastifyRequest,
	args: UpdateCallTransferToolByIdInput
): Promise<UpdateCallTransferToolByIdOutput | void> => {
	const { businessId, scenarioId, scenario, transferTo, warmTransfer, availability, customHours } = args

	const business = await Business.findById(businessId)
	if (!business) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}

	const existingScenario = business.callTransferSettings.scenarios.find((s) => s.scenarioId === scenarioId)
	if (!existingScenario) {
		throw new Error(`No scenario found with the provided ID: ${scenarioId}`)
	}
	const updateToolPayload = {
		businessName: business.name,
		transferTo: transferTo ?? existingScenario.transferTo,
		warmTransfer: warmTransfer ?? existingScenario.warmTransfer,
		assistantCallTransferToolId: business.aiAgentSettings.assistantCallTransferToolId!,
	}
	const callTransferTool = await updateCallTransferTool(updateToolPayload)
	if (!callTransferTool?.id) {
		throw new Error(`Failed to update call transfer tool`)
	}

	const updated = await Business.findByIdAndUpdate(
		businessId,
		{
			$set: {
				'callTransferSettings.scenarios.$[scenario].scenario': scenario,
				'callTransferSettings.scenarios.$[scenario].transferTo': transferTo,
				'callTransferSettings.scenarios.$[scenario].warmTransfer': warmTransfer,
				'callTransferSettings.scenarios.$[scenario].availability': availability,
				'callTransferSettings.scenarios.$[scenario].customHours': customHours,
				hasPublish: true,
			},
		},
		{
			new: true,
			arrayFilters: [{ 'scenario.scenarioId': scenarioId }],
		}
	)
	if (!updated) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}

	return updated.callTransferSettings
}
