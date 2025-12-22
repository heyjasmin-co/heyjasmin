import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { updateBusinessAppointmentByIdBodySchema, updateBusinessAppointmentByIdParamsSchema } from './types'

export const updateBusinessAppointmentByIdHandler = asyncHandler(async (request, reply) => {
	const params = updateBusinessAppointmentByIdParamsSchema.parse(request.params)
	const body = updateBusinessAppointmentByIdBodySchema.parse(request.body)
	const businessService = new BusinessService()
	const appointment = await businessService.updateBusinessAppointmentById(request, { ...params, ...body })

	return reply.status(200).send({
		success: true,
		message: 'Business Appointment updated successfully',
		data: appointment,
	})
})
