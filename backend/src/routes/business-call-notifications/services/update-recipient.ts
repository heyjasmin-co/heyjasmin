import { BusinessCallNotification } from '../../../models/BusinessNotification'
import { UpdateRecipientInput, UpdateRecipientOutput } from './types'

export const updateRecipient = async (args: UpdateRecipientInput): Promise<UpdateRecipientOutput> => {
	const { businessId, type, recipientId, ...data } = args
	const field = type === 'email' ? 'emailRecipients' : 'textRecipients'
	return await BusinessCallNotification.findOneAndUpdate(
		{ businessId, [`${field}.id`]: recipientId },
		{
			$set: {
				[`${field}.$.value`]: data.value,
			},
		},
		{ new: true }
	)
}
