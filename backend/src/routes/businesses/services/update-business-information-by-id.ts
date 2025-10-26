import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { UpdateBusinessInformationByIdInput, UpdateBusinessInformationByIdOutput } from './types'

export const updateBusinessInformationById = async (
	request: FastifyRequest,
	args: UpdateBusinessInformationByIdInput
): Promise<UpdateBusinessInformationByIdOutput> => {
	const { businessId, ...updateData } = args
	const updateBusinessInformation = await Business.findByIdAndUpdate(businessId, { $set: updateData }, { new: true, runValidators: true })
		.select('name overview address')
		.lean()

	if (!updateBusinessInformation) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}

	return {
		name: updateBusinessInformation.name,
		overview: updateBusinessInformation.overview,
		address: updateBusinessInformation.address,
	}
}
