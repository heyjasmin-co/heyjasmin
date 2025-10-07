// src/types/fastify.d.ts
import 'fastify'
import { Mongoose } from 'mongoose'

declare module 'fastify' {
	interface FastifyRequest {
		context?: {
			role?: string | null
			dbUserId?: string | null
			businessId?: string | null
			clerkId?: string | null
		}
	}

	interface FastifyInstance {
		mongoose: Mongoose
	}
}
