import { FastifyRequest } from 'fastify'
import { Business, BusinessUser } from '../../../models'
import { checkBusinessSubscription } from '../../../services/subscription.service'
import { GetBusinessesServiceInput, GetBusinessesServiceOutput } from './types'

export const getBusinesses = async (request: FastifyRequest, input: GetBusinessesServiceInput): Promise<GetBusinessesServiceOutput> => {
	const { page, limit } = input
	const skip = (page - 1) * limit

	const query: any = {}

	const [businesses, total] = await Promise.all([
		Business.find(query).populate('ownerUserId', 'firstName lastName email').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
		Business.countDocuments(query),
	])

	const detailedBusinesses = await Promise.all(
		businesses.map(async (business: any) => {
			const [subscription, memberCount] = await Promise.all([
				checkBusinessSubscription(business._id.toString()),
				BusinessUser.countDocuments({ businessId: business._id }),
			])

			return {
				...business,
				_id: business._id.toString(),
				subscription: {
					plan: subscription.plan,
					isTrial: subscription.isTrial,
					status: subscription.status,
					message: subscription.message,
				},
				twilioNumber: business.aiAgentSettings?.twilioNumber || null,
				memberCount,
			}
		})
	)

	return {
		businesses: detailedBusinesses,
		total,
		pages: Math.ceil(total / limit),
		currentPage: page,
	}
}
