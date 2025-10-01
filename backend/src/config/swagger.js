export const swaggerOptions = {
  swagger: {
    info: {
      title: 'Fastify Complete API',
      description: 'API with Mongoose, Stripe, Clerk, and Zod validation',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'general', description: 'General endpoints' },
      { name: 'users', description: 'User management' },
      { name: 'payments', description: 'Payment processing' },
      { name: 'webhooks', description: 'Webhook handlers' }
    ],
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter your Clerk session token: Bearer {token}'
      }
    }
  }
};

export const swaggerUIOptions = {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true
  },
  staticCSP: true
};