import { asyncHandler } from '../../../utils/asyncHandler'
import { ScrapeWebsiteService } from '../services'
import { websiteScrapeBodySchema } from './types'

export const websiteScrapeHandler = asyncHandler(async (request, reply) => {
	const body = websiteScrapeBodySchema.parse(request.body)

	const websiteScrapeService = new ScrapeWebsiteService()
	await websiteScrapeService.websiteScrape(request, body)

	return reply.status(200).send({
		message: 'Agent has successfully retrieved your business data',
	})
})
