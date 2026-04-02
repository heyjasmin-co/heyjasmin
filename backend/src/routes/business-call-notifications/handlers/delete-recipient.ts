import { asyncHandler } from '../../../utils/asyncHandler'
import { NotificationService } from '../services'
import { recipientIdParamsSchema } from './types'

export const deleteRecipientHandler = asyncHandler(async (request, reply) => {
	const params = recipientIdParamsSchema.parse(request.params)
	const notificationService = new NotificationService()
	const settings = await notificationService.deleteRecipient(params)

	return reply.status(200).send({
		success: true,
		message: `${params.type === 'email' ? 'Email' : 'Text'} recipient deleted successfully`,
		data: settings,
	})
})
