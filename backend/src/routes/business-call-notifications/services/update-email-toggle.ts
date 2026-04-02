import { BusinessCallNotification } from '../../../models/BusinessNotification'
import { UpdateEmailToggleInput, UpdateEmailToggleOutput } from './types'

export const updateEmailToggle = async (args: UpdateEmailToggleInput): Promise<UpdateEmailToggleOutput> => {
	const { businessId, enabled } = args
	return await BusinessCallNotification.findOneAndUpdate(
		{ businessId },
		{ emailNotificationsEnabled: enabled },
		{ new: true, upsert: true }
	)
}
