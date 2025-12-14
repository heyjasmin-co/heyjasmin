import { ConfirmPaymentSubscriptionSchemaInput, CreatePaymentIntentSchemaInput } from '../handlers/types'

//
export type CreatePaymentIntentInput = CreatePaymentIntentSchemaInput
export type CreatePaymentIntentOutput = {
	clientSecret: string | null
} | null

//
export type ConfirmPaymentSubscriptionInput = ConfirmPaymentSubscriptionSchemaInput
export type ConfirmPaymentSubscriptionOutput = string
