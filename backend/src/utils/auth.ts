import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

const getSecret = () => process.env.JWT_SECRET || 'super-secret-key-change-this'

export const signToken = (id: string, email: string) => {
	return jwt.sign({ id, email }, getSecret(), {
		expiresIn: '7d',
	})
}

export const verifyToken = (token: string) => {
	return jwt.verify(token, getSecret()) as { id: string; email: string }
}

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
