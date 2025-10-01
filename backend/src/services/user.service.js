import { User } from '../models/index.js';

export const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getUserByClerkId = async (clerkUserId) => {
  return await User.findOne({ clerkUserId });
};

export const getUserByStripeCustomerId = async (customerId) => {
  return await User.findOne({ stripeCustomerId: customerId });
};

export const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const updateUserByClerkId = async (clerkUserId, updateData) => {
  return await User.findOneAndUpdate({ clerkUserId }, updateData, { new: true, upsert: true });
};

export const deleteUserByClerkId = async (clerkUserId) => {
  return await User.findOneAndDelete({ clerkUserId });
};

export const getAllUsers = async (filter = {}, options = {}) => {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;
  
  const users = await User.find(filter)
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
    
  const total = await User.countDocuments(filter);
  
  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};