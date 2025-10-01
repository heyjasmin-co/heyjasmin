import { Webhook } from 'svix';
import config from '../../config/index.js';
import * as clerkService from '../../services/clerk.service.js';

export default async function clerkWebhook(fastify) {
  fastify.post('/clerk', {
    config: {
      rawBody: true
    },
    schema: {
      tags: ['webhooks-clerk'],
      description: 'Clerk webhook endpoint',
      hide: true
    }
  }, async (request, reply) => {
    const svixId = request.headers['svix-id'];
    const svixTimestamp = request.headers['svix-timestamp'];
    const svixSignature = request.headers['svix-signature'];

    if (!svixId || !svixTimestamp || !svixSignature) {
      fastify.log.error('Missing Svix headers');
      return reply.code(400).send({ error: 'Missing webhook headers' });
    }

    const rawBody = request.rawBody || request.body;
    const bodyString = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody);

    const wh = new Webhook(config.CLERK_WEBHOOK_SECRET);
    let evt;

    try {
      evt = wh.verify(bodyString, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      });
    } catch (err) {
      fastify.log.error(`Webhook signature verification failed: ${err.message}`);
      return reply.code(400).send({ error: 'Webhook signature verification failed' });
    }

    const { type, data } = evt;
    fastify.log.info(`Received Clerk event: ${type}`);

    try {
      switch (type) {
        case 'user.created':
          await clerkService.handleUserCreated(data);
          fastify.log.info(`User created: ${data.id}`);
          break;

        case 'user.updated':
          await clerkService.handleUserUpdated(data);
          fastify.log.info(`User updated: ${data.id}`);
          break;

        case 'user.deleted':
          await clerkService.handleUserDeleted(data.id);
          fastify.log.info(`User deleted: ${data.id}`);
          break;

        default:
          fastify.log.info(`Unhandled Clerk event type: ${type}`);
      }

      return reply.code(200).send({ received: true });
    } catch (error) {
      fastify.log.error(`Error processing Clerk webhook: ${error.message}`);
      return reply.code(500).send({ error: 'Webhook processing failed' });
    }
  });
}