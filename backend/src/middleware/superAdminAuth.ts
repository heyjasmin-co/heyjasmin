import { FastifyReply, FastifyRequest } from 'fastify'
import { verifyToken } from '../utils/auth'

export interface AuthenticatedRequest extends FastifyRequest {
	user?: {
		id: string
		email: string
	}
}

export const authenticateSuperAdmin = async (request: AuthenticatedRequest, reply: FastifyReply) => {
	try {
		const authHeader = request.headers.authorization
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			request.log.warn('Authentication failed: Missing or invalid authorization header')
			return reply.code(401).send({ success: false, error: 'Unauthorized' })
		}

		const token = authHeader.split(' ')[1]
		const decoded = verifyToken(token)
		request.user = decoded
	} catch (error) {
		request.log.error(error, 'Authentication failed')
		return reply.code(401).send({ success: false, error: 'Invalid token' })
	}
}
