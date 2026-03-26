// Avoid importing SDK types directly to prevent type-resolution issues; use local 'any' types for external resources.
import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { checkBusinessSubscription } from '../../../services/subscription.service'
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

	const subscription = await checkBusinessSubscription(businessId)
	if (!subscription.isTrial && !subscription.isActive) {
		throw new Error('Business subscription is inactive or expired. Please renew.')
	}

	const assistantId = updated?.aiAgentSettings?.assistantId
	if (!assistantId) {
		throw new Error('AI Assistant has not been created yet. Please complete the business setup first.')
	}

	await updateAIAssistant(
		{
			businessName: updated?.name,
			services: updated?.services,
			businessHours: updated?.businessHours,
			bookingLink: updated?.appointmentSettings?.schedulingLink ?? undefined,
			currentPlan: subscription.plan ?? 'essential',
			availability_scenario: updated?.callTransferSettings?.scenarios?.[0]?.availability ?? 'none',
			customHours: updated?.callTransferSettings?.scenarios?.[0]?.customHours ?? [],
		},
		assistantId
	)

	updated.hasPublish = false
	await updated.save()

	return updated
}
