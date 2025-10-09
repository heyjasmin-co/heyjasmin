import { FastifyInstance } from 'fastify'
import { authenticate } from '../../middleware/clerkAuth'
import { websiteScrapeHandler } from './handlers/scrape-website'
import { websiteScrapeBodySchema } from './handlers/types'

export default async function websiteScrapeRoutes(fastify: FastifyInstance) {
	fastify.post('/', {
		preHandler: [authenticate],
		schema: {
			tags: ['scrape'],
			description: 'Scrape Data from Website',
			body: websiteScrapeBodySchema,
		},
		handler: websiteScrapeHandler,
	})
}
