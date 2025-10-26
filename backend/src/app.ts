import { clerkPlugin } from '@clerk/fastify'
import dotenv from 'dotenv'
dotenv.config()

import Fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import config from './config/index'
import { createContext } from './context'
import mongoosePlugin from './plugins/mongoose'
import swaggerPlugin from './plugins/swagger'
import routes from './routes/index'
import { AppError } from './utils/errors'

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

	await app.register(require('@fastify/sensible'))
	await app.register(mongoosePlugin)
	await app.register(swaggerPlugin)

	await app.register(clerkPlugin)
	await app.register(require('@fastify/cors'), {
		origin: '*',
	})
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
