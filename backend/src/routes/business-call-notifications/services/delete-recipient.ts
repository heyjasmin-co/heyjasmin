import { BusinessCallNotification } from '../../../models/BusinessNotification'
import { DeleteRecipientInput, DeleteRecipientOutput } from './types'

export const deleteRecipient = async (args: DeleteRecipientInput): Promise<DeleteRecipientOutput> => {
	const { businessId, type, recipientId } = args
	const field = type === 'email' ? 'emailRecipients' : 'textRecipients'
	return await BusinessCallNotification.findOneAndUpdate(
		{ businessId },
		{ $pull: { [field]: { id: recipientId } } },
		{ new: true }
	)
}
	