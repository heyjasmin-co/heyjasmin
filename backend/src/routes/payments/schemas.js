export const createPaymentIntentSchema = {
  body: {
    type: 'object',
    required: ['amount', 'userId'],
    properties: {
      amount: { type: 'number', minimum: 50 },
      currency: { type: 'string', default: 'usd' },
      userId: { type: 'string' },
      metadata: { type: 'object' }
    }
  }
};