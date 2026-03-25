import { FastifyRequest } from 'fastify'
import mongoose from 'mongoose'
import { Business } from '../../../models'
import { attachToolToAssistant, createCallTransferTool, deleteCallTransferTool } from '../../../services/vapi.service'
import { CreateCallTransferToolByIdInput, CreateCallTransferToolByIdOutput } from './types'

export const createCallTransferToolById = async (
	request: FastifyRequest,
	args: CreateCallTransferToolByIdInput
): Promise<CreateCallTransferToolByIdOutput | void> => {
	const { businessId, scenario, transferTo, warmTransfer, availability, customHours } = args

	const business = await Business.findById(businessId)
	if (!business) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}

	let callTransferTool: any | null = null
	try {
		callTransferTool = await createCallTransferTool({ businessName: business.name, transferTo, warmTransfer })
		if (!callTransferTool?.id) {
			throw new Error(`Failed to create call transfer tool`)
		}

		await attachToolToAssistant({
			toolId: callTransferTool.id,
			assistantId: business.aiAgentSettings.assistantId!,
		})

		const updatedBusiness = await Business.findByIdAndUpdate(
			businessId,
			{
				$set: {
					'aiAgentSettings.assistantCallTransferToolId': callTransferTool.id,
					hasPublish: true,
				},
				$push: {
					'callTransferSettings.scenarios': {
						scenarioId: new mongoose.Types.ObjectId().toString(),
						scenario,
						transferTo,
						warmTransfer,
						availability,
						customHours,
					},
				},
			},
			{ new: true }
		)

		if (!updatedBusiness) {
			throw new Error(`No business found with the provided ID: ${businessId}`)
		}

		return updatedBusiness.callTransferSettings
	} catch (error) {
		console.error('Error creating call transfer tool:', error)
		if (callTransferTool?.id) {
			await deleteCallTransferTool(callTransferTool.id)
		}
		throw error
	}
}
