import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String
  },
  stripeCustomerId: {
    type: String,
    sparse: true
  },
  subscription: {
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled', 'past_due'],
      default: 'inactive'
    },
    stripeSubscriptionId: String,
    currentPeriodEnd: Date,
    planId: String
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

userSchema.index({ email: 1 });
userSchema.index({ clerkUserId: 1 });
userSchema.index({ stripeCustomerId: 1 });

export default mongoose.model('User', userSchema);