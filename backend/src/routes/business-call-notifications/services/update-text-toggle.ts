import { BusinessCallNotification } from '../../../models/BusinessNotification'
import { UpdateTextToggleInput, UpdateTextToggleOutput } from './types'

export const updateTextToggle = async (args: UpdateTextToggleInput): Promise<UpdateTextToggleOutput> => {
	const { businessId, enabled } = args
	return await BusinessCallNotification.findOneAndUpdate(
		{ businessId },
		{ textNotificationsEnabled: enabled },
		{ new: true, upsert: true }
	)
}
