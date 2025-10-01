import fp from 'fastify-plugin';
import clerkClient from '../config/clerk.js';

async function authPlugin(fastify) {
  fastify.decorate('authenticate', async function(request, reply) {
    try {
      const authHeader = request.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.unauthorized('Missing or invalid authorization header');
      }

      const token = authHeader.substring(7);
      const { userId } = await clerkClient.verifyToken(token);
      
      if (!userId) {
        return reply.unauthorized('Invalid token');
      }

      request.userId = userId;
      const user = await clerkClient.users.getUser(userId);
      request.clerkUser = user;
      
    } catch (error) {
      fastify.log.error('Authentication error:', error);
      return reply.unauthorized('Authentication failed');
    }
  });
}

export default fp(authPlugin);