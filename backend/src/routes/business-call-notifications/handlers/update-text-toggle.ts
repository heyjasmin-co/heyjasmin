import { asyncHandler } from '../../../utils/asyncHandler'
import { NotificationService } from '../services'
import { businessIdParamsSchema, updateToggleBodySchema } from './types'

export const updateTextToggleHandler = asyncHandler(async (request, reply) => {
	const params = businessIdParamsSchema.parse(request.params)
	const body = updateToggleBodySchema.parse(request.body)
	const notificationService = new NotificationService()
	const settings = await notificationService.updateTextToggle({ ...params, ...body })

	return reply.status(200).send({
		success: true,
		message: 'Text notifications toggled successfully',
		data: settings,
	})
})
