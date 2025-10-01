import * as stripeService from '../../services/stripe.service.js';
import * as paymentService from '../../services/payment.service.js';
import { createPaymentIntentSchema } from './schemas.js';

export default async function paymentRoutes(fastify) {
  // Create payment intent
  fastify.post('/create-intent', { schema: createPaymentIntentSchema }, async (request, reply) => {
    try {
      const { amount, currency, userId, metadata } = request.body;
      
      const paymentIntent = await stripeService.createPaymentIntent(
        amount,
        currency || 'usd',
        userId,
        metadata
      );

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.internalServerError('Failed to create payment intent');
    }
  });

  // Get user payments
  fastify.get('/user/:userId', async (request, reply) => {
    try {
      const payments = await paymentService.getUserPayments(request.params.userId);
      return { payments };
    } catch (error) {
      fastify.log.error(error);
      return reply.internalServerError('Failed to fetch payments');
    }
  });
}