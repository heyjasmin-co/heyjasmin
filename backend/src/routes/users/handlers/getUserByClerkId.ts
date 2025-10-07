import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../services'
import { getUserByClerkIdParamsSchema } from './types'

export async function getUserByClerkIdHandler(
	request: FastifyRequest<{
		Params: typeof getUserByClerkIdParamsSchema._type
	}>,
	reply: FastifyReply
) {
	try {
		const userService = new UserService()
		const user = await userService.getUserByClerkId(request.params)
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
