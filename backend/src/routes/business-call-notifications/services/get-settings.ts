import { BusinessCallNotification } from '../../../models/BusinessNotification'
import { GetSettingsInput, GetSettingsOutput } from './types'

export const getSettings = async (args: GetSettingsInput): Promise<GetSettingsOutput> => {
	const { businessId } = args
	let settings = await BusinessCallNotification.findOne({ businessId })

	if (!settings) {
		settings = await BusinessCallNotification.create({
			businessId,
			emailNotificationsEnabled: true,
			textNotificationsEnabled: true,
			emailRecipients: [],
			textRecipients: [],
		})
	}

	return settings
}
