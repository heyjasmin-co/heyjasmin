import { BusinessCallNotification } from '../../../models/BusinessNotification'
import { AddRecipientInput, AddRecipientOutput } from './types'

export const addRecipient = async (args: AddRecipientInput): Promise<AddRecipientOutput> => {
	const { businessId, type, ...recipientData } = args
	const field = type === 'email' ? 'emailRecipients' : 'textRecipients'
	return await BusinessCallNotification.findOneAndUpdate(
		{ businessId },
		{ $push: { [field]: recipientData } },
		{ new: true, upsert: true }
	)
}
