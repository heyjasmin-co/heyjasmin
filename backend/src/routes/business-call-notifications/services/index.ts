import { getSettings } from './get-settings'
import { updateEmailToggle } from './update-email-toggle'
import { updateTextToggle } from './update-text-toggle'
import { addRecipient } from './add-recipient'
import { updateRecipient } from './update-recipient'
import { deleteRecipient } from './delete-recipient'

export class NotificationService {
	getSettings = getSettings
	updateEmailToggle = updateEmailToggle
	updateTextToggle = updateTextToggle
	addRecipient = addRecipient
	updateRecipient = updateRecipient
	deleteRecipient = deleteRecipient
}
