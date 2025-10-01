import { z } from 'zod';

export const createUserValidator = z.object({
  email: z.string().email('Invalid email format'),
  clerkUserId: z.string().min(1, 'Clerk user ID is required'),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  imageUrl: z.string().url().optional()
});

export const updateUserValidator = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  imageUrl: z.string().url().optional(),
  metadata: z.record(z.string()).optional()
});

export const userIdParamValidator = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId')
});

export const paginationValidator = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10)
});