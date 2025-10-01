import stripe from '../config/stripe.js';
import * as userService from './user.service.js';
import * as paymentService from './payment.service.js';

export const createCustomer = async (email, name) => {
  const customer = await stripe.customers.create({
    email,
    name
  });
  return customer;
};

export const createPaymentIntent = async (amount, currency, clerkUserId, metadata = {}) => {
  const user = await userService.getUserByClerkId(clerkUserId);
  
  if (!user) {
    throw new Error('User not found');
  }

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customerName = user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user.email;
    const customer = await createCustomer(user.email, customerName);
    customerId = customer.id;
    await userService.updateUser(user._id, { stripeCustomerId: customerId });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    customer: customerId,
    metadata: {
      userId: user._id.toString(),
      clerkUserId,
      ...metadata
    }
  });

  await paymentService.createPayment({
    userId: user._id,
    clerkUserId,
    stripePaymentIntentId: paymentIntent.id,
    amount,
    currency,
    status: 'pending',
    metadata
  });

  return paymentIntent;
};

export const createSubscription = async (customerId, priceId) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent']
  });
  
  return subscription;
};