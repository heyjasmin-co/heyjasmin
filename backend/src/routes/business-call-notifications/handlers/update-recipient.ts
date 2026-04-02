import { asyncHandler } from '../../../utils/asyncHandler'
import { NotificationService } from '../services'
import { recipientIdParamsSchema, updateRecipientBodySchema } from './types'

export const updateRecipientHandler = asyncHandler(async (request, reply) => {
	const params = recipientIdParamsSchema.parse(request.params)
	const body = updateRecipientBodySchema.parse(request.body)
	const notificationService = new NotificationService()
	const settings = await notificationService.updateRecipient({ ...params, ...body })

	return reply.status(200).send({
		success: true,
		message: `${params.type === 'email' ? 'Email' : 'Text'} recipient updated successfully`,
		data: settings,
	})
})
