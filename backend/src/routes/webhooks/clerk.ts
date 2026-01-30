import type { FastifyInstance } from 'fastify'
import * as clerkService from '../../services/clerk.service'
import { asyncHandler } from '../../utils/asyncHandler'
import { runTransaction } from '../../utils/transaction'
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
						await asyncHandler(async (request, _reply) => {
							await runTransaction(async (session) => {
								const user = await clerkService.handleUserCreated(request, data, session)

								if (data.public_metadata?.eventType === 'business-invitation') {
									await clerkService.handleBusinessUserCreated({ user, data }, session)
								}
							})

							fastify.log.info(`✅ User created: ${data.id}`)
						})(request, reply)

						break
					case 'organizationInvitation.accepted':
						await asyncHandler(async (_req, _reply) => {
							await runTransaction(async (session) => {
								if (data.public_metadata?.eventType === 'business-invitation') {
									await clerkService.handleBusinessUserInvitationCreated(data, session)
								}
							})

							fastify.log.info(`✅ User created: ${data.id}`)
						})(request, reply)

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
