import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { GetBusinessDetailOutput, GetBusinessDetailsInput } from './types'

export const getBusinessDetailsById = async (request: FastifyRequest, args: GetBusinessDetailsInput): Promise<GetBusinessDetailOutput> => {
	const { businessId } = args

	const businessDetails = await Business.findById({ _id: businessId })
	if (!businessDetails) {
		throw new Error(`No business found with the provided ID: ${businessId}`)
	}
	return businessDetails
}
