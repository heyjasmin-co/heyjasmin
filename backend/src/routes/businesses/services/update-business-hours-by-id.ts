import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { UpdateBusinessHoursByIdInput, UpdateBusinessHoursByIdOutput } from './types'

export const updateBusinessHoursById = async (
	request: FastifyRequest,
	args: UpdateBusinessHoursByIdInput
): Promise<UpdateBusinessHoursByIdOutput> => {
	const { businessId, businessHours } = args

	const updated = await Business.findByIdAndUpdate(businessId, { $set: { businessHours } }, { new: true, runValidators: true })
		.select('businessHours')
		.lean()

	if (!updated) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}

	return updated.businessHours
}
