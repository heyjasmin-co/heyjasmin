import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { GetBusinessDetailOutput, GetBusinessDetailsInput } from './types'

export const getBusinessDetailsById = async (request: FastifyRequest,args:GetBusinessDetailsInput): Promise<GetBusinessDetailOutput> => {
	const context = request.context

	const businessDetails = await Business.findById({ _id: context?.businessId })

	return businessDetails
}
