import type { FastifyInstance } from 'fastify'

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
			console.log(request.body)
		}
	)
}
