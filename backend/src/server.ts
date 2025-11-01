import 'dotenv/config'
import { createApp } from './app'
import config from './config/index'
const start = async () => {
	const app = await createApp()

	try {
		const port = Number(process.env.PORT || config.PORT || 8080)
		const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : config.HOST

		await app.listen({
			port: port,
			host: host,
		})

		app.log.info(`Server listening on ${host}:${port}`)
		app.log.info(`Swagger docs: http://${host}:${port}/documentation`)
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
