import { FastifyInstance } from 'fastify'
import { createContext } from '../../context'
import { websiteScrapeHandler } from './handlers/scrape-website'
import { websiteScrapeBodySchema } from './handlers/types'

export default async function websiteScrapeRoutes(fastify: FastifyInstance) {
	fastify.post('/', {
		preHandler: [createContext],
		schema: {
			tags: ['scrape'],
			description: 'Scrape Data from Website',
			body: websiteScrapeBodySchema,
		},
		handler: websiteScrapeHandler,
	})
}
