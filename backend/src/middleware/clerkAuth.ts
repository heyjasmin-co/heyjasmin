import { FastifyReply, FastifyRequest } from 'fastify'
import { ForbiddenError, UnauthorizedError } from '../utils/errors'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
	if (!request.context?.clerkId) {
		throw new UnauthorizedError('Clerk Authentication required')
	}
	if (!request.context?.dbUserId) {
		throw new UnauthorizedError('Authentication required')
	}
}

export function requireRole(...roles: string[]) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		await authenticate(request, reply)

		const userRole = request.context?.role

		if (!userRole || !roles.includes(userRole)) {
			throw new ForbiddenError('Insufficient permissions')
		}
	}
}
