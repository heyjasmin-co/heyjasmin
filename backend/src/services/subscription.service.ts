import config from '../config'
import { Business, IBusiness } from '../models/Business'

interface SubscriptionStatus {
	isTrial: boolean
	isActive: boolean
	remainingMinutes: number | 'unlimited'
	plan?: 'essential' | 'pro' | 'plus' | null
}

export async function checkBusinessSubscription(businessId: string): Promise<SubscriptionStatus> {
	const business: IBusiness | null = await Business.findById(businessId)
	if (!business) {
		throw new Error('Business not found')
	}

	const { stripeSettings, totalCallMinutes } = business
	const usedMinutes = totalCallMinutes || 0

	// Trial
	if (stripeSettings.subscriptionStatus === 'trial_active') {
		const remaining = Math.max(config.TRIAL_MINUTES - usedMinutes, 0)
		return {
			isTrial: true,
			isActive: true,
			remainingMinutes: remaining,
			plan: null,
		}
	}

	// Active subscription
	if (stripeSettings.subscriptionStatus === 'active') {
		let remaining: number | 'unlimited' = 'unlimited'
		if (stripeSettings.subscriptionPlan === 'essential') {
			remaining = Math.max(100 - usedMinutes, 0)
		}

		return {
			isTrial: false,
			isActive: true,
			remainingMinutes: remaining,
			plan: stripeSettings.subscriptionPlan || null,
		}
	}

	// Inactive / canceled / unpaid
	return {
		isTrial: false,
		isActive: false,
		remainingMinutes: 0,
		plan: stripeSettings.subscriptionPlan || null,
	}
}
