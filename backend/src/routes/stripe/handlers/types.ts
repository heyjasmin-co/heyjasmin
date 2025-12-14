import { z } from 'zod'

// ------------------ Payment Intent ------------------
export const createPaymentIntentBodySchema = z.object({
	businessId: z.string(),
	priceId: z.string(),
})

export type CreatePaymentIntentSchemaInput = z.infer<typeof createPaymentIntentBodySchema>

// ------------------ Confirm Payment Subscription ------------------
export const confirmPaymentSubscriptionSchema = z.object({
	setupIntentId: z.string(),
	businessId: z.string(),
	priceId: z.string(),
})

export type ConfirmPaymentSubscriptionSchemaInput = z.infer<typeof confirmPaymentSubscriptionSchema>
