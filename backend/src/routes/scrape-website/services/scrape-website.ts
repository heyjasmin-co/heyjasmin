import { FastifyRequest } from 'fastify'
import { createBusinessFromData } from '../../../helper/createBusinessFromData'
import { BusinessData, ExtractError, extractBusinessData } from '../../../utils/extract-website-data'
import scrapeWebsiteContent from '../../../utils/scraping-website'
import { WebsiteScrapeInput, WebsiteScrapeOutput } from './types'

export const websiteScrape = async (ctx: FastifyRequest, args: WebsiteScrapeInput): Promise<WebsiteScrapeOutput> => {
	const { websiteUrl } = args

	const scrapedContent = await scrapeWebsiteContent(websiteUrl)
	if (!scrapedContent) throw new Error('Failed to scrape website content')

	const data = await extractBusinessData(websiteUrl, scrapedContent)
	if ((data as ExtractError).error) {
		throw new Error(`AI extraction failed: ${(data as ExtractError).details || (data as ExtractError).error}`)
	}
	const dbUserId = ctx.context?.dbUserId
	const clerkId = ctx.context?.clerkId
	return await createBusinessFromData({ data: data as BusinessData, dbUserId, clerkId })
}
