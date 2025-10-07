import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'
import config from '../config/index'

async function swaggerPlugin(fastify: FastifyInstance) {
	await fastify.register(swagger, {
		openapi: {
			info: {
				title: 'Fastify API',
				description: 'API documentation',
				version: '1.0.0',
			},
			servers: [
				{
					url: `http://localhost:${config.PORT}`,
					description: 'Development server',
				},
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
			},
		},
		transform: jsonSchemaTransform,
	})

	await fastify.register(swaggerUi, {
		routePrefix: '/docs',
		uiConfig: {
			docExpansion: 'list',
			deepLinking: false,
		},
	})
}

export default fp(swaggerPlugin, {
	name: 'swagger-plugin',
})
