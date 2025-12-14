import { IBusiness } from '../../../models'
import { BusinessUser } from '../../../models/BusinessUser'
import { checkBusinessSubscription } from '../../../services/subscription.service'
import { MeUserInput, MeUserOutput } from './types'

export const me = async (request: MeUserInput): Promise<MeUserOutput> => {
	const context = request.context

	if (!context || !context.dbUserId || !context.clerkId) {
		return {
			dbUserId: null,
			clerkId: null,
			businessId: null,
			isSetupComplete: false,
			role: null,
			assistantNumber: null,
			businessName: null,
			subscription: null,
		}
	}

	let isSetupComplete = false
	let role: string | null = null
	let assistantNumber: string | null = null
	let businessName: string | null = null
	let subscriptionDetails: MeUserOutput['subscription'] = null

	if (context.businessId) {
		const businessUser = await BusinessUser.findOne({
			businessId: context.businessId,
			userId: context.dbUserId,
		}).populate<{ businessId: IBusiness }>({
			path: 'businessId',
		})

		if (businessUser?.businessId) {
			const business = businessUser.businessId
			businessName = business.name ?? null
			assistantNumber = business.aiAgentSettings?.twilioNumber ?? null
			isSetupComplete = business.isSetupComplete ?? false
			role = businessUser.role ?? null

			// Fetch subscription
			try {
				const subscriptionStatus = await checkBusinessSubscription(context.businessId.toString())

				subscriptionDetails = {
					plan: subscriptionStatus.plan ?? 'trial',
					remainingMinutes: subscriptionStatus.remainingMinutes,
					stripePriceId: subscriptionStatus.stripePriceId ?? null,
					remainingMinutesFormatted: formatMinutes(subscriptionStatus.remainingMinutes),
					usedMinutes: business.totalCallMinutes ?? 0,
					status: subscriptionStatus.status,
				}
			} catch (error) {
				console.error('Error fetching subscription status:', error)
				subscriptionDetails = null
			}
		}
	}

	return {
		dbUserId: context.dbUserId,
		clerkId: context.clerkId,
		businessId: context.businessId ?? null,
		isSetupComplete,
		role: role ?? context.role ?? null,
		assistantNumber,
		businessName,
		subscription: subscriptionDetails,
	}
}

/** Format minutes to MM:SS or ∞ for unlimited */
function formatMinutes(minutes: number | 'unlimited'): string {
	if (minutes === 'unlimited') return 'Unlimited'

	const totalMinutes = Math.floor(minutes)
	const seconds = Math.floor((minutes - totalMinutes) * 60)

	return `${totalMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
