import { Payment } from '../models/index.js';

export const createPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  await payment.save();
  return payment;
};

export const getPaymentByIntentId = async (intentId) => {
  return await Payment.findOne({ stripePaymentIntentId: intentId });
};

export const updatePaymentStatus = async (intentId, status, metadata = {}) => {
  return await Payment.findOneAndUpdate(
    { stripePaymentIntentId: intentId },
    { status, metadata },
    { new: true }
  );
};

export const getUserPayments = async (userId) => {
  return await Payment.find({ userId }).sort({ createdAt: -1 });
};

export const getUserPaymentsByClerkId = async (clerkUserId) => {
  return await Payment.find({ clerkUserId }).sort({ createdAt: -1 });
};