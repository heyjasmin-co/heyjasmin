import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import mongoose from 'mongoose'
import { dbConfig } from '../config/database'
import config from '../config/index'

async function mongoosePlugin(fastify: FastifyInstance) {
	try {
		await mongoose.connect(config.MONGODB_URI, dbConfig)

		fastify.log.info('MongoDB connected successfully')
		fastify.decorate('mongoose', mongoose)

		fastify.addHook('onClose', async (instance) => {
			await mongoose.connection.close()
			instance.log.info('MongoDB connection closed')
		})
	} catch (err: any) {
		fastify.log.error('MongoDB connection error:', err)
		throw err
	}
}

export default fp(mongoosePlugin, {
	name: 'mongoose-plugin',
})
