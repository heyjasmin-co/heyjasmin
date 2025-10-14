import { FastifyReply, FastifyRequest } from 'fastify'
import { ForbiddenError, UnauthorizedError } from '../utils/errors'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
	if (!request.context?.clerkId) {
		throw new UnauthorizedError('Clerk Authentication required')
	}

	if (!request.context?.dbUserId) {
		throw new UnauthorizedError('User not found in database')
	}
}

export function requireRole(...roles: string[]) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		await authenticate(request, reply)

		const userRole = (request as any).context?.role

		if (!userRole || !roles.includes(userRole)) {
			throw new ForbiddenError('Insufficient permissions')
		}
	}
}
