import { FastifyReply, FastifyRequest } from 'fastify'
import { asyncHandler } from '../../../utils/asyncHandler'
import { StripeService } from '../services'
import { confirmPaymentSubscriptionSchema } from './types'

export const confirmPaymentSubscriptionHandler = asyncHandler(async (request: FastifyRequest, reply: FastifyReply) => {
	// Validate and parse request body
	const body = confirmPaymentSubscriptionSchema.parse(request.body)

	const stripeService = new StripeService()
	const subscriptionData = await stripeService.confirmPaymentSubscription(request, body)

	return reply.status(200).send({
		success: true,
		message: 'Subscription confirmed successfully',
		data: subscriptionData,
	})
})
