import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clerkUserId: {
    type: String,
    required: true
  },
  stripePaymentIntentId: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'usd'
  },
  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'cancelled'],
    default: 'pending'
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

paymentSchema.index({ userId: 1 });
paymentSchema.index({ clerkUserId: 1 });
paymentSchema.index({ stripePaymentIntentId: 1 });

export default mongoose.model('Payment', paymentSchema);