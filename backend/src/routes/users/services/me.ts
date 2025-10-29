import { IBusiness } from '../../../models'
import { BusinessUser } from '../../../models/BusinessUser'
import { MeUserInput, MeUserOutput } from './types'

export const me = async (request: MeUserInput): Promise<MeUserOutput> => {
	const context = request.context

	if (!context || !context.dbUserId || !context.clerkId) {
		return {
			dbUserId: null,
			clerkId: null,
			businessId: null,
			isSetupComplete: false,
			hasSubscription: false,
			role: null,
			assistantNumber: null,
			businessName: null,
			subscriptionNumbersLeft: null,
		}
	}

	let isSetupComplete: boolean | null = null
	let role: string | null = null
	let assistantNumber: string | null = null
	let businessName: string | null = null
	let subscriptionNumbersLeft: string | null = null

	if (context.businessId) {
		const businessUser = await BusinessUser.findOne({
			businessId: context.businessId,
			userId: context.dbUserId,
		}).populate<{ businessId: IBusiness }>({
			path: 'businessId',
		})

		businessName = businessUser?.businessId.name ?? null
		subscriptionNumbersLeft = '20:00' // TODO: For future
		assistantNumber = businessUser?.businessId.aiAgentSettings.twilioNumber ?? null
		isSetupComplete = businessUser?.businessId?.isSetupComplete ?? null
		role = businessUser?.role ?? null
	}

	return {
		dbUserId: context.dbUserId,
		clerkId: context.clerkId,
		businessId: context.businessId,
		isSetupComplete: isSetupComplete ?? false,
		hasSubscription: false,
		role: role ?? context.role ?? null,
		assistantNumber,
		businessName,
		subscriptionNumbersLeft,
	}
}
