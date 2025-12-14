import config from '../config'
import { Business } from '../models/Business'
import { BusinessPlan } from '../models/BusinessPlan'
import { Trial } from '../models/Trial'
export interface SubscriptionStatus {
	isTrial: boolean
	isActive: boolean
	remainingMinutes: number | 'unlimited'
	status: 'active' | 'inactive' | 'canceled' | 'unpaid' | 'trial_active' | 'trial_ended'
	plan?: 'essential' | 'pro' | 'plus' | null
	message: string
	stripePriceId?: string | null
}

export type GetSubscriptionStatusInput = string

export async function checkBusinessSubscription(businessId: string): Promise<SubscriptionStatus> {
	const business = await Business.findById(businessId)
	if (!business) throw new Error('Business not found')

	const usedMinutes = business.totalCallMinutes || 0

	const [trial, plan] = await Promise.all([Trial.findOne({ businessId }), BusinessPlan.findOne({ businessId })])

	// 1. Active subscription
	if (plan?.subscriptionStatus === 'active' && (!plan.subscriptionEndDate || plan.subscriptionEndDate > new Date())) {
		const planType = plan.subscriptionPlan
		if (planType === 'essential') {
			const remaining = Math.max(200 - usedMinutes, 0)
			if (remaining === 0) {
				plan.subscriptionStatus = 'inactive'
				plan.save()
			}
			return {
				isTrial: false,
				isActive: true,
				remainingMinutes: remaining,
				plan: 'essential',
				status: remaining === 0 ? 'inactive' : 'active',
				stripePriceId: plan.stripePriceId ?? null,
				message:
					remaining > 0
						? `Active subscription with ${remaining} minutes remaining`
						: 'Essential plan limit reached (200 minutes)',
			}
		}

		return {
			isTrial: false,
			isActive: true,
			remainingMinutes: 'unlimited',
			plan: planType || null,
			status: 'active',
			stripePriceId: plan.stripePriceId ?? null,
			message: `Active ${planType || 'subscription'} with unlimited minutes`,
		}
	}

	// 2. Subscription expired
	if (plan && (plan.subscriptionStatus !== 'active' || (plan.subscriptionEndDate && plan.subscriptionEndDate <= new Date()))) {
		return {
			isTrial: false,
			isActive: false,
			remainingMinutes: 0,
			plan: plan.subscriptionPlan || null,
			status: 'inactive',
			stripePriceId: plan?.stripePriceId ?? null,
			message: 'Subscription expired. Please renew to continue.',
		}
	}

	// 3. Active trial
	if (trial && trial.trialStatus === 'trial_active') {
		const trialLimit = config.TRIAL_MINUTES || 20
		const remaining = Math.max(trialLimit - usedMinutes, 0)
		return {
			isTrial: true,
			isActive: true,
			remainingMinutes: remaining,
			plan: null,
			status: 'trial_active',
			stripePriceId: null,
			message: remaining > 0 ? `Trial active with ${remaining} minutes remaining` : 'Trial minutes exhausted',
		}
	}

	// 4. Trial ended
	if (trial && trial.trialStatus === 'trial_ended') {
		return {
			isTrial: true,
			isActive: false,
			remainingMinutes: 0,
			plan: null,
			status: 'trial_ended',
			stripePriceId: null,
			message: 'Trial ended. Please subscribe to continue.',
		}
	}

	// 5. No subscription or trial
	return {
		isTrial: false,
		isActive: false,
		remainingMinutes: 0,
		plan: null,
		status: 'inactive',
		stripePriceId: null,
		message: 'No active trial or subscription found.',
	}
}

// Helper function to get remaining minutes
export async function getBusinessRemainingMinutes(businessId: string): Promise<number | 'unlimited'> {
	const status = await checkBusinessSubscription(businessId)
	return status.remainingMinutes
}
