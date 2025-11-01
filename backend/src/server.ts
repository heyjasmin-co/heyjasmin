import 'dotenv/config'
import { createApp } from './app'
const start = async () => {
	const app = await createApp()

	try {
		const port = Number(process.env.PORT || process.env.RAILWAY_PORT || 8080)
		const host = '0.0.0.0'

		await app.listen({
			port: port,
			host: host,
		})

		app.log.info(`Server listening on ${host}:${port}`)
		app.log.info(`Swagger docs: http://${host}:${port}/docs`)
	} catch (err) {
		app.log.error(err)
		process.exit(1)
	}
}

process.on('SIGINT', async () => {
	console.log('Shutting down gracefully...')
	process.exit(0)
})

start()
