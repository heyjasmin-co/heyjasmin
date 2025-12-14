import { clerkPlugin } from '@clerk/fastify'
import dotenv from 'dotenv'
import Fastify from 'fastify'
import fastifyRawBody from 'fastify-raw-body'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import config from './config/index'
import mongoosePlugin from './plugins/mongoose'
import swaggerPlugin from './plugins/swagger'
import routes from './routes/index'
import { AppError } from './utils/errors'
dotenv.config()

export const createApp = async () => {
	const app = await Fastify({
		logger: {
			level: config.LOG_LEVEL || 'info',
			transport:
				config.NODE_ENV === 'production'
					? undefined
					: {
							target: 'pino-pretty',
							options: {
								colorize: true,
								translateTime: 'HH:MM:ss',
								ignore: 'pid,hostname,reqId',
							},
					  },
		},
		bodyLimit: 1048576,
	})

	app.setValidatorCompiler(validatorCompiler)
	app.setSerializerCompiler(serializerCompiler)

	await app.register(require('@fastify/cors'), {
		origin: true,
		credentials: true,
	})
	await app.register(fastifyRawBody, {
		field: 'rawBody',
		global: false,
		encoding: false,
		runFirst: true,
		routes: ['/api/v1/webhooks-stripe'],
	})
	await app.register(clerkPlugin, {
		publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
		secretKey: process.env.CLERK_SECRET_KEY,
	})
	await app.register(require('@fastify/sensible'))
	await app.register(mongoosePlugin)
	await app.register(swaggerPlugin)
	await app.register(routes)
	app.setErrorHandler((error, request, reply) => {
		if (error.validation) {
			return reply.code(400).send({
				success: false,
				error: 'Validation Error',
				message: error.message,
				details: error.validation,
			})
		}

		if (error instanceof AppError) {
			return reply.code(error.statusCode).send({
				success: false,
				error: error.message,
			})
		}

		app.log.error(error)
		const message = config.NODE_ENV === 'production' ? 'Internal server error' : error.message

		return reply.code(error.statusCode || 500).send({
			success: false,
			error: message,
		})
	})

	return app
}
