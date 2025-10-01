import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { swaggerOptions, swaggerUIOptions } from '../config/swagger.js';

async function swaggerPlugin(fastify) {
  await fastify.register(swagger, swaggerOptions);
  await fastify.register(swaggerUI, swaggerUIOptions);
}

export default fp(swaggerPlugin);