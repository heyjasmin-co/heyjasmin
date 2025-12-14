import { FastifyRequest } from 'fastify'
import stripe from '../../../config/stripe'
import { getPriceIdAmount } from '../../../utils/subscriptions'
import { CreatePaymentIntentInput, CreatePaymentIntentOutput } from './types'

export const createPaymentIntent = async (request: FastifyRequest, args: CreatePaymentIntentInput): Promise<CreatePaymentIntentOutput> => {
	const { businessId, priceId } = args
	const amount = getPriceIdAmount(priceId)

	const setupIntent = await stripe.setupIntents.create({
		payment_method_types: ['card'],
		metadata: {
			businessId,
			priceId,
		},
	})
	return { clientSecret: setupIntent.client_secret }
}
