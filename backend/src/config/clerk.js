import { createClerkClient } from '@clerk/clerk-sdk-node';
import config from './index.js';

export const clerkClient = createClerkClient({
  secretKey: config.CLERK_SECRET_KEY,
});

export default clerkClient;