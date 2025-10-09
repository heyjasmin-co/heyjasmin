import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../services'

export async function getMeHandler(request: FastifyRequest, reply: FastifyReply) {
	try {
		const userService = new UserService()
		const clerkId = (request as any).context?.clerkId
		if (!clerkId) {
			return reply.status(401).send({
				success: false,
				error: 'Authentication required',
			})
		}
		const user = await userService.getUserByClerkId({ clerkId })
		if (!user) {
			return reply.status(404).send({
				success: false,
				error: 'User not found',
			})
		}

		return reply.status(200).send({
			success: true,
			data: user,
		})
	} catch (error) {
		return reply.status(500).send({
			success: false,
			error: 'Internal server error',
		})
	}
}
