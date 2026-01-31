import { FastifyRequest } from 'fastify'
import { ClientSession } from 'mongoose'
import stripe from '../../../config/stripe'
import { Business, BusinessPlan, BusinessUser, Call, Trial } from '../../../models'
import { releaseTwilioNumber } from '../../../services/twilio.service'
import { deleteAIAssistant, deleteSendSMSTool, deleteVapiPhoneNumber } from '../../../services/vapi.service'
import { runTransaction } from '../../../utils/transaction'
import { DeleteBusinessServiceInput, DeleteBusinessServiceOutput } from './types'

export const deleteBusinessAndUser = async (
	request: FastifyRequest,
	params: DeleteBusinessServiceInput,
	session?: ClientSession
): Promise<DeleteBusinessServiceOutput> => {
	const executeDeletion = async (s: ClientSession) => {
		const { id } = params
		const business = await Business.findById(id).session(s)
		if (!business) throw new Error('Business not found')

		// 1. Stripe Cleanup
		const businessPlan = await BusinessPlan.findOne({ businessId: id }).session(s)
		if (businessPlan?.stripeSubscriptionId && businessPlan.subscriptionStatus !== 'canceled') {
			try {
				await stripe.subscriptions.cancel(businessPlan.stripeSubscriptionId)
			} catch (error: any) {
				request.log.warn(`Stripe subscription cancel failed for business ${id}: ${error.message}`)
			}
		}

		if (business?.stripeCustomerId) {
			try {
				await stripe.customers.del(business.stripeCustomerId)
			} catch (error: any) {
				request.log.warn(`Stripe customer delete failed for business ${id}: ${error.message}`)
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

		if (business.aiAgentSettings?.assistantToolId) {
			try {
				await deleteSendSMSTool(business.aiAgentSettings.assistantToolId)
			} catch (error: any) {
				request.log.warn(`Vapi tool delete failed for business ${id}: ${error.message}`)
			}
		}

		if (business.aiAgentSettings?.assistantPhoneNumberId) {
			try {
				await deleteVapiPhoneNumber(business.aiAgentSettings.assistantPhoneNumberId)
			} catch (error: any) {
				request.log.warn(`Vapi phone number delete failed for business ${id}: ${error.message}`)
			}
		}

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
			BusinessPlan.deleteMany({ businessId: id }, { session: s }),
			Trial.deleteMany({ businessId: id }, { session: s }),
			BusinessUser.deleteMany({ businessId: id }, { session: s }),
			Call.deleteMany({ businessId: id }, { session: s }),
			Business.deleteOne({ _id: id }, { session: s }),
		])

		return { message: 'Business and all associated resources deleted successfully' }
	}

	if (session) {
		return await executeDeletion(session)
	}

	return await runTransaction(executeDeletion)
}
