import 'dotenv/config'
import { createApp } from './app'
import config from './config/index'

const start = async () => {
	try {
		const app = await createApp()

		// Railway requires binding to 0.0.0.0 and using their PORT
		const port = Number(process.env.PORT) || Number(config.PORT) || 8080
		const host = '0.0.0.0' // Always use 0.0.0.0 in production

		console.log(`🚀 Starting server on ${host}:${port}`)
		console.log(`📝 Environment: ${process.env.NODE_ENV}`)
		console.log(`🔌 MongoDB URI exists: ${!!process.env.MONGODB_URI}`)

		await app.listen({
			port: port,
			host: host,
		})

		console.log(`✅ Server successfully listening on ${host}:${port}`)
		app.log.info(`Server listening on ${host}:${port}`)
		app.log.info(`Swagger docs: http://${host}:${port}/documentation`)
	} catch (err) {
		console.error('❌ Fatal error during startup:', err)
		process.exit(1)
	}
}

// Graceful shutdown
process.on('SIGINT', async () => {
	console.log('⚠️  SIGINT received, shutting down gracefully...')
	process.exit(0)
})

process.on('SIGTERM', async () => {
	console.log('⚠️  SIGTERM received, shutting down gracefully...')
	process.exit(0)
})

process.on('unhandledRejection', (reason, promise) => {
	console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason)
	process.exit(1)
})

start()
