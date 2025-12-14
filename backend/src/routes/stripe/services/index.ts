import { confirmPaymentSubscription } from './confirm-payment-subscription'
import { createPaymentIntent } from './create-payment-intent'

export class StripeService {
	createPaymentIntent = createPaymentIntent
	confirmPaymentSubscription = confirmPaymentSubscription
}
