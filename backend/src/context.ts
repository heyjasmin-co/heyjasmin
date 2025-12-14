/// <reference path="./types/fastify.d.ts" />

import { getAuth } from '@clerk/fastify'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from './routes/users/services'

export const createContext = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const auth = getAuth(request)
	
		const context = {
			dbUserId: (auth.sessionClaims?.dbUserId as string) || null,
			clerkId: auth.userId || null,
			role: (auth.sessionClaims?.role as string) || null,
			businessId: (auth.sessionClaims?.businessId as string) || null,
		}

		if (auth.userId && !context.dbUserId) {
			const userService = new UserService()
			const user = await userService.getUserByClerkId({ clerkId: auth.userId })

			if (!user?._id) {
				throw new Error('User not found for provided Clerk ID')
			}

			context.dbUserId = user._id.toString()
			request.log.info({ context }, 'User context created')
		}

		request.context = context

		return context
	} catch (err) {
		request.log.error({ err }, 'Context initialization failed')
		return {
			dbUserId: null,
			clerkId: null,
			role: null,
			businessId: null,
		}
	}
}
