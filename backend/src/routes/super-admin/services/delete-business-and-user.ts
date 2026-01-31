import { FastifyRequest } from 'fastify'
import stripe from '../../../config/stripe'
import { Business, BusinessPlan, BusinessUser, Call, Trial } from '../../../models'
import { releaseTwilioNumber } from '../../../services/twilio.service'
import { deleteAIAssistant } from '../../../services/vapi.service'
import { DeleteBusinessServiceInput, DeleteBusinessServiceOutput } from './types'

export const deleteBusinessAndUser = async (
	request: FastifyRequest,
	params: DeleteBusinessServiceInput
): Promise<DeleteBusinessServiceOutput> => {
	const { id } = params
	const business = await Business.findById(id)
	if (!business) throw new Error('Business not found')

	// 1. Stripe Cleanup
	const businessPlan = await BusinessPlan.findOne({ businessId: id })
	if (businessPlan?.stripeSubscriptionId && businessPlan.subscriptionStatus !== 'canceled') {
		try {
			await stripe.subscriptions.cancel(businessPlan.stripeSubscriptionId)
		} catch (error: any) {
			request.log.warn(`Stripe subscription cancel failed for business ${id}: ${error.message}`)
		}
	}

	// 2. Vapi Cleanup
	if (business.aiAgentSettings?.assistantId) {
		try {
			await deleteAIAssistant(business.aiAgentSettings.assistantId)
		} catch (error: any) {
			request.log.warn(`Vapi assistant delete failed for business ${id}: ${error.message}`)
		}
	}
	// We don't store toolId in Business model currently, but if we did, we'd delete it here.
	// However, deleteAIAssistant might be enough if tools are assistant-scoped or if we find them.

	// 3. Twilio Cleanup
	if (business.aiAgentSettings?.twilioId) {
		try {
			await releaseTwilioNumber(business.aiAgentSettings.twilioId)
		} catch (error: any) {
			request.log.warn(`Twilio number release failed for business ${id}: ${error.message}`)
		}
	}

	// 4. Database Cleanup (Cascading)
	await Promise.all([
		BusinessPlan.deleteMany({ businessId: id }),
		Trial.deleteMany({ businessId: id }),
		BusinessUser.deleteMany({ businessId: id }),
		Call.deleteMany({ businessId: id }),
		Business.deleteOne({ _id: id }),
	])

	return { message: 'Business and all associated resources deleted successfully' }
}
