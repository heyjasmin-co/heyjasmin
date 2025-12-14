import mongoose from 'mongoose'
import { Business } from '../models'
import { BusinessPlan, IBusinessPlan } from '../models/BusinessPlan'
import { getSubscriptionByPriceId } from '../utils/subscriptions'
import { linkTwilioNumberToAIAssistant } from './vapi.service'
export type GetBusinessPlanInput = string
export type GetBusinessPlanOutput = {
	subscriptionStatus: 'active' | 'inactive' | 'canceled' | 'unpaid'
	subscriptionPlan: 'essential' | 'pro' | 'plus' | null
	subscriptionStartDate: Date
	subscriptionEndDate: Date | null
	isExpired: boolean
	stripePriceId: string | null
} | null

export const getBusinessPlan = async (businessId: GetBusinessPlanInput): Promise<GetBusinessPlanOutput> => {
	// Validate businessId format
	if (!mongoose.Types.ObjectId.isValid(businessId)) {
		throw new Error('Invalid businessId format')
	}

	// Find active or relevant subscription
	const plan = await BusinessPlan.findOne({
		businessId: new mongoose.Types.ObjectId(businessId),
	}).lean<IBusinessPlan>()

	if (!plan) {
		return null
	}

	const now = new Date()
	const endDate = plan.subscriptionEndDate ? new Date(plan.subscriptionEndDate) : null

	return {
		subscriptionStatus: plan.subscriptionStatus,
		subscriptionPlan: plan.subscriptionPlan ?? null,
		subscriptionStartDate: plan.subscriptionStartDate,
		stripePriceId: plan.stripePriceId ?? null,
		subscriptionEndDate: endDate,
		isExpired: endDate ? now > endDate : false,
	}
}

export const createBusinessPlan = async (
	args: { businessId: string; customerId: string; subscriptionId: string; priceId: string },
	session: mongoose.ClientSession
) => {
	// Update business with Stripe customer
	const { businessId, customerId, subscriptionId, priceId } = args

	const business = await Business.findById(businessId)
	if (!business) throw new Error('Business not found')

	business.stripeCustomerId = customerId
	business.totalCallMinutes = 0 // fresh start

	const subscription = getSubscriptionByPriceId(priceId)
	// Create or update BusinessPlan
	if (business.aiAgentSettings && !business.aiAgentSettings.assistantPhoneNumberId) {
		const response = await linkTwilioNumberToAIAssistant({
			businessName: business.name,
			assistantId: business.aiAgentSettings.assistantId!,
			mobileNumber: business.aiAgentSettings.twilioNumber!,
		})
		business.aiAgentSettings.assistantPhoneNumberId = response.id
	}
	await business.save({ session })
	await BusinessPlan.findOneAndUpdate(
		{ businessId: business._id }, // if exists → update
		{
			$set: {
				subscriptionStatus: 'active',
				subscriptionPlan: subscription?.name || null,
				stripeSubscriptionId: subscriptionId,
				stripePriceId: priceId,
				subscriptionStartDate: new Date(),
				subscriptionEndDate: null,
			},
			$setOnInsert: {
				businessId: business._id,
			},
		},
		{
			new: true,
			upsert: true,
			session,
		}
	)
}
