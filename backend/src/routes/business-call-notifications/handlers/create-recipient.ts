import { asyncHandler } from '../../../utils/asyncHandler'
import { NotificationService } from '../services'
import { createRecipientBodySchema, recipientTypeParamsSchema } from './types'

export const createRecipientHandler = asyncHandler(async (request, reply) => {
	const params = recipientTypeParamsSchema.parse(request.params)
	const body = createRecipientBodySchema.parse(request.body)
	const notificationService = new NotificationService()
	const settings = await notificationService.addRecipient({ ...params, ...body })

	return reply.status(201).send({
		success: true,
		message: `${params.type === 'email' ? 'Email' : 'Text'} recipient added successfully`,
		data: settings,
	})
})
