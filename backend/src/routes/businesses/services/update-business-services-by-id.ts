import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { UpdateBusinessServicesByIdInput, UpdateBusinessServicesByIdOutput } from './types'

export const updateBusinessServicesById = async (
	request: FastifyRequest,
	args: UpdateBusinessServicesByIdInput
): Promise<UpdateBusinessServicesByIdOutput> => {
	const { businessId, services } = args

	const updated = await Business.findByIdAndUpdate(businessId, { $set: { services } }, { new: true, runValidators: true })
		.select('services')
		.lean()

	if (!updated) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}

	return updated.services
}
