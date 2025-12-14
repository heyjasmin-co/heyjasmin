// middlewares/checkBusinessSubscription.ts
import { FastifyReply, FastifyRequest } from 'fastify'
import { Business } from '../models/Business'
import { checkBusinessSubscription } from '../services/subscription.service'

export async function requireActiveSubscription(request: FastifyRequest, reply: FastifyReply) {
	try {
		const businessId = request.context?.businessId as string
		if (!businessId) {
			return reply.status(400).send({ error: 'Business ID is required' })
		}

		const business = await Business.findById(businessId)
		if (!business) {
			return reply.status(404).send({ error: 'Business not found' })
		}

		const subscription = await checkBusinessSubscription(businessId)

		if (!subscription.isTrial && !subscription.isActive) {
			return reply.status(403).send({
				error: 'Business subscription is inactive or expired. Please renew.',
			})
		}
	} catch (error: any) {
		console.error('Error in checkBusinessAccess middleware:', error)
		return reply.status(500).send({ error: 'Internal server error' })
	}
}
