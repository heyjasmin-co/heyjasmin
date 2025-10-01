import config from '../../config/index.js';
import stripe from '../../config/stripe.js';
import * as userService from '../../services/user.service.js';
import * as paymentService from '../../services/payment.service.js';

export default async function stripeWebhook(fastify) {
  fastify.post('/stripe', {
    config: {
      rawBody: true
    },
    schema: {
      tags: ['webhooks'],
      description: 'Stripe webhook endpoint',
      hide: true
    }
  }, async (request, reply) => {
    const sig = request.headers['stripe-signature'];
    let event;

    try {
      const rawBody = request.rawBody || request.body;
      event = stripe.webhooks.constructEvent(rawBody, sig, config.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      fastify.log.error(`Webhook signature verification failed: ${err.message}`);
      return reply.code(400).send({ error: 'Webhook signature verification failed' });
    }

    fastify.log.info(`Received Stripe event: ${event.type}`);

    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await handlePaymentIntentSucceeded(event.data.object, fastify);
          break;
        case 'payment_intent.payment_failed':
          await handlePaymentIntentFailed(event.data.object, fastify);
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          await handleSubscriptionUpdate(event.data.object, fastify);
          break;
        case 'customer.subscription.deleted':
          await handleSubscriptionDeleted(event.data.object, fastify);
          break;
        case 'invoice.payment_succeeded':
          await handleInvoicePaymentSucceeded(event.data.object, fastify);
          break;
        case 'invoice.payment_failed':
          await handleInvoicePaymentFailed(event.data.object, fastify);
          break;
        default:
          fastify.log.info(`Unhandled event type: ${event.type}`);
      }

      return reply.code(200).send({ received: true });
    } catch (error) {
      fastify.log.error(`Error processing webhook: ${error.message}`);
      return reply.code(500).send({ error: 'Webhook processing failed' });
    }
  });
}

async function handlePaymentIntentSucceeded(paymentIntent, fastify) {
  fastify.log.info(`Payment succeeded: ${paymentIntent.id}`);
  await paymentService.updatePaymentStatus(paymentIntent.id, 'succeeded', paymentIntent.metadata);
}

async function handlePaymentIntentFailed(paymentIntent, fastify) {
  fastify.log.error(`Payment failed: ${paymentIntent.id}`);
  await paymentService.updatePaymentStatus(paymentIntent.id, 'failed', paymentIntent.metadata);
}

async function handleSubscriptionUpdate(subscription, fastify) {
  fastify.log.info(`Subscription updated: ${subscription.id}`);
  const user = await userService.getUserByStripeCustomerId(subscription.customer);
  
  if (user) {
    await userService.updateUser(user._id, {
      'subscription.status': subscription.status,
      'subscription.stripeSubscriptionId': subscription.id,
      'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
      'subscription.planId': subscription.items.data[0]?.price.id
    });
  }
}

async function handleSubscriptionDeleted(subscription, fastify) {
  fastify.log.info(`Subscription deleted: ${subscription.id}`);
  const user = await userService.getUserByStripeCustomerId(subscription.customer);
  
  if (user) {
    await userService.updateUser(user._id, {
      'subscription.status': 'cancelled',
      'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000)
    });
  }
}

async function handleInvoicePaymentSucceeded(invoice, fastify) {
  fastify.log.info(`Invoice payment succeeded: ${invoice.id}`);
}

async function handleInvoicePaymentFailed(invoice, fastify) {
  fastify.log.error(`Invoice payment failed: ${invoice.id}`);
  const user = await userService.getUserByStripeCustomerId(invoice.customer);
  
  if (user) {
    await userService.updateUser(user._id, {
      'subscription.status': 'past_due'
    });
  }
}