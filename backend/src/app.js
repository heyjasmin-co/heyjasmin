import Fastify from 'fastify';
import corsPlugin from './plugins/cors.js';
import sensiblePlugin from './plugins/sensible.js';
import mongoosePlugin from './plugins/mongoose.js';
import swaggerPlugin from './plugins/swagger.js';
import authPlugin from './plugins/auth.js';
import routes from './routes/index.js';
import config from './config/index.js';

export const createApp = async (opts = {}) => {
  const app = Fastify({
    logger: {
      level: config.LOG_LEVEL
    },
    bodyLimit: 1048576,
    ...opts
  });

  // Register plugins
  await app.register(corsPlugin);
  await app.register(sensiblePlugin);
  await app.register(mongoosePlugin);
  await app.register(swaggerPlugin);
  await app.register(authPlugin);

  // Register routes
  await app.register(routes);

  // Global error handler
  app.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Validation Error',
        message: error.message,
        validation: error.validation
      });
    }

    app.log.error(error);
    reply.status(error.statusCode || 500).send({
      statusCode: error.statusCode || 500,
      error: error.name || 'Internal Server Error',
      message: error.message
    });
  });

  return app;
};