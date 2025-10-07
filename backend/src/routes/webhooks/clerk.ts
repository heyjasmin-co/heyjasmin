import type { FastifyInstance } from 'fastify'
import * as clerkService from '../../services/clerk.service'
type ClerkWebhookBody = {
	type:
		| 'user.created'
		| 'organizationMembership.created'
		| 'organizationInvitation.accepted'
		| 'user.deleted'
		| 'organizationInvitation.revoked'

	data: any
}
export default async function clerkWebhook(fastify: FastifyInstance) {
	fastify.post(
		'/',
		{
			config: {
				rawBody: true,
			},
			schema: {
				tags: ['webhooks-clerk'],
				description: 'Clerk webhook endpoint',
				hide: true,
			},
		},
		async (request, reply) => {
			const { data, type } = request.body as ClerkWebhookBody

			try {
				switch (type) {
					case 'user.created':
						await clerkService.handleUserCreated(data)
						fastify.log.info(`User created: ${data.id}`)
						break

					default:
						fastify.log.info(`Unhandled Clerk event type: ${type}`)
				}

				return reply.code(200).send({ received: true })
			} catch (error: any) {
				fastify.log.error(`Error processing Clerk webhook: ${error.message}`)
				return reply.code(500).send({ error: 'Webhook processing failed' })
			}
		}
	)
}
