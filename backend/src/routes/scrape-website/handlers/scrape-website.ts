import { FastifyReply, FastifyRequest } from 'fastify'
import { ScrapeWebsiteService } from '../services'
import { websiteScrapeBodySchema } from './types'

export async function websiteScrapeHandler(
	request: FastifyRequest<{
		Body: typeof websiteScrapeBodySchema._type
	}>,
	reply: FastifyReply
) {
	try {
		const websiteScrapeService = new ScrapeWebsiteService()
		const websiteData = await websiteScrapeService.websiteScrape(request.body)
		console.log('websiteData', websiteData)
		// if (!user) {
		// 	return reply.status(404).send({
		// 		success: false,
		// 		error: 'User not found',
		// 	})
		// }

		// return reply.status(200).send({
		// 	success: true,
		// 	data: user,
		// })
	} catch (error) {
		return reply.status(500).send({
			success: false,
			error: 'Internal server error',
		})
	}
}
