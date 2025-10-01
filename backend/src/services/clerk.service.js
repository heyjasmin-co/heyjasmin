import clerkClient from '../config/clerk.js';
import * as userService from './user.service.js';

export const syncClerkUserToDb = async (clerkUser) => {
  const userData = {
    clerkUserId: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    imageUrl: clerkUser.imageUrl,
    metadata: clerkUser.publicMetadata
  };

  return await userService.updateUserByClerkId(clerkUser.id, userData);
};

export const handleUserCreated = async (clerkUser) => {
  return await syncClerkUserToDb(clerkUser);
};

export const handleUserUpdated = async (clerkUser) => {
  return await syncClerkUserToDb(clerkUser);
};

export const handleUserDeleted = async (clerkUserId) => {
  return await userService.deleteUserByClerkId(clerkUserId);
};