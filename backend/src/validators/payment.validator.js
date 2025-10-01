import { z } from 'zod';

export const createPaymentIntentValidator = z.object({
  amount: z.number().int().min(50, 'Amount must be at least 50 cents'),
  currency: z.string().length(3).default('usd'),
  metadata: z.record(z.string()).optional()
});

export const createSubscriptionValidator = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
  metadata: z.record(z.string()).optional()
});

export const paymentIdParamValidator = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid payment ID')
});