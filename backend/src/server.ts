import 'dotenv/config'
import { createApp } from './app'

const start = async () => {
	try {
		const app = await createApp()

		// Railway uses different port mechanisms - try multiple approaches
		const port = Number(process.env.PORT || process.env.RAILWAY_PORT || 8080)
		const host = '0.0.0.0'

		console.log(`🚀 Starting server on ${host}:${port}`)
		console.log(`📝 Environment: ${process.env.NODE_ENV}`)
		console.log(`🔌 MongoDB URI exists: ${!!process.env.MONGODB_URI}`)
		console.log(`📍 PORT from env: ${process.env.PORT}`)
		console.log(`📍 RAILWAY_PORT from env: ${process.env.RAILWAY_PORT}`)
		console.log(`📍 Using port: ${port}`)

		await app.listen({
			port: port,
			host: host,
		})

		console.log(`✅ Server successfully listening on ${host}:${port}`)
		app.log.info(`Server listening on ${host}:${port}`)
		app.log.info(`Swagger docs: http://${host}:${port}/documentation`)
	} catch (err: any) {
		console.error('❌ Fatal error during startup:', err)
		console.error('Error stack:', err.stack)
		process.exit(1)
	}
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
	console.log('⚠️  SIGTERM received, shutting down gracefully...')
	process.exit(0)
})

process.on('SIGINT', () => {
	console.log('⚠️  SIGINT received, shutting down gracefully...')
	process.exit(0)
})

process.on('unhandledRejection', (reason, promise) => {
	console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason)
})

console.log('📦 Starting application...')
start()
