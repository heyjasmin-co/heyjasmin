import cors from '@fastify/cors'
import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import config from '../config/index'

async function corsPlugin(fastify: FastifyInstance) {
	await fastify.register(cors, {
		origin: config.NODE_ENV === 'production' ? ['https://yourdomain.com'] : true,
		credentials: true,
	})
}

export default fp(corsPlugin, {
	name: 'cors-plugin',
})
