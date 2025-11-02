import { createClerkClient } from '@clerk/fastify'
import config from './index'

export const clerkClient = createClerkClient({
	secretKey: config.CLERK_SECRET_KEY,
	publishableKey: config.CLERK_PUBLISHABLE_KEY,
})

export default clerkClient
