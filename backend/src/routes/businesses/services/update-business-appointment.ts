import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { UpdateBusinessAppointmentByIdInput, UpdateBusinessAppointmentByIdOutput } from './types'

export const updateBusinessAppointmentById = async (
	request: FastifyRequest,
	args: UpdateBusinessAppointmentByIdInput
): Promise<UpdateBusinessAppointmentByIdOutput> => {
	const { businessId, appointmentEnabled, appointmentMessage, schedulingLink } = args

	const updated = await Business.findByIdAndUpdate(
		businessId,
		{
			$set: {
				'appointmentSettings.appointmentEnabled': appointmentEnabled,
				'appointmentSettings.appointmentMessage': appointmentMessage,
				'appointmentSettings.schedulingLink': schedulingLink,
			},
		},
		{ new: true }
	)

	if (!updated) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}

	return updated.appointmentSettings
}
