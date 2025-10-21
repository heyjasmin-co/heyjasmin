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
			hasSubscription: false, // TODO: For future
			role: null,
		}
	}
	let isSetupComplete = null
	let role: string | null = null
	if (context.businessId) {
		const businessUser = await BusinessUser.findOne({
			businessId: context.businessId,
		}).populate<{ businessId: IBusiness }>({
			path: 'businessId',
			select: 'name isSetupComplete subscriptionStatus',
		})
		isSetupComplete = businessUser?.businessId?.isSetupComplete
		role = businessUser?.role!
	}

	return {
		dbUserId: context.dbUserId,
		clerkId: context.clerkId,
		businessId: context.businessId,
		isSetupComplete: isSetupComplete,
		hasSubscription: false, // TODO: For future
		role: role ?? context.role,
	}
}
