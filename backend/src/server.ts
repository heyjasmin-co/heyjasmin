import 'dotenv/config'
import { createApp } from './app'
import config from './config/index'
const start = async () => {
	const app = await createApp()

	try {
		await app.listen({
			port: config.PORT ?? 1234,
			host: config.HOST,
		})

		app.log.info(`Server listening on ${config.HOST}:${config.PORT}`)
		app.log.info(`Swagger docs: http://${config.HOST}:${config.PORT}/documentation`)
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
