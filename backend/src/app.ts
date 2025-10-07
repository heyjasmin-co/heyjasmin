import { clerkPlugin } from '@clerk/fastify'
import Fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import config from './config/index'
import { createContext } from './context'
import corsPlugin from './plugins/cors'
import mongoosePlugin from './plugins/mongoose'
import sensiblePlugin from './plugins/sensible'
import swaggerPlugin from './plugins/swagger'
import routes from './routes/index'
import { AppError } from './utils/errors'

export const createApp = async (opts = {}) => {
	const app = Fastify({
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
		...opts,
	})

	app.setValidatorCompiler(validatorCompiler)
	app.setSerializerCompiler(serializerCompiler)

	await app.register(clerkPlugin)

	await app.register(corsPlugin)
	await app.register(sensiblePlugin)
	await app.register(mongoosePlugin)
	await app.register(swaggerPlugin)

	app.addHook('preHandler', createContext)

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
