import { asyncHandler } from '../../../utils/asyncHandler'
import { NotificationService } from '../services'
import { businessIdParamsSchema } from './types'

export const getSettingsHandler = asyncHandler(async (request, reply) => {
	const params = businessIdParamsSchema.parse(request.params)
	const notificationService = new NotificationService()
	const settings = await notificationService.getSettings(params)

	return reply.status(200).send({
		success: true,
		message: 'Notification settings retrieved successfully',
		data: settings,
	})
})
