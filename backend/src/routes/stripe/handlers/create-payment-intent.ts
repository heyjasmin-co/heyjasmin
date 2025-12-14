import { asyncHandler } from '../../../utils/asyncHandler'
import { StripeService } from '../services'
import { createPaymentIntentBodySchema } from './types'

export const createPaymentIntentHandler = asyncHandler(async (request, reply) => {
	const body = createPaymentIntentBodySchema.parse(request.body)
	const stripeService = new StripeService()
	const stripeResponse = await stripeService.createPaymentIntent(request, body)

	return reply.status(200).send({
		success: true,
		message: 'Payment Intent created successfully',
		data: stripeResponse,
	})
})
