import type { FastifyInstance } from 'fastify'
import { handleCreateAssistantCall } from '../../services/vapi.service'

export default async function vapiWebhook(fastify: FastifyInstance) {
	fastify.post(
		'/',
		{
			config: {
				rawBody: true,
			},
			schema: {
				tags: ['webhooks-vapi'],
				description: 'Vapi webhook endpoint',
				hide: true,
			},
		},
		async (request, reply) => {
			const body = request.body as any
			const vapiMessage = body.message as any

			switch (vapiMessage.type) {
				case 'end-of-call-report':
					await handleCreateAssistantCall(request, vapiMessage)
					reply.code(200).send({ success: true })
					break
				default:
					request.log.info('Unhandled Vapi message type:', vapiMessage.type)
					reply.code(200).send({ success: true })
			}
		}
	)
}
