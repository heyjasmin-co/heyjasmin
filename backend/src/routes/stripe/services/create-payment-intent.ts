import { FastifyRequest } from 'fastify'
import stripe from '../../../config/stripe'
import { CreatePaymentIntentInput, CreatePaymentIntentOutput } from './types'

export const createPaymentIntent = async (request: FastifyRequest, args: CreatePaymentIntentInput): Promise<CreatePaymentIntentOutput> => {
	const { businessId, priceId } = args

	const findPrice = await stripe.prices.retrieve(priceId)
	if (!findPrice) {
		throw new Error('Price not found')
	}

	const setupIntent = await stripe.setupIntents.create({
		payment_method_types: ['card'],
		metadata: {
			businessId,
			priceId,
		},
	})
	request.log.info(`Payment Intent created successfully`)
	return { clientSecret: setupIntent.client_secret }
}
