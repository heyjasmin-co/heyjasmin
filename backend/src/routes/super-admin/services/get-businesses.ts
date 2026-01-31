import { FastifyRequest } from 'fastify'
import { Business } from '../../../models/Business'

export const getBusinesses = async (request: FastifyRequest) => {
	return Business.find().populate('ownerUserId', 'firstName lastName email').sort({ createdAt: -1 })
}
