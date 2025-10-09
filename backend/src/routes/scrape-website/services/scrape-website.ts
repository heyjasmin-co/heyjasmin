import { extractBusinessData } from '../../../lib/openAIModel'
import { WebsiteScrapeInput, WebsiteScrapeOutput } from './types'

export const websiteScrape = async (args: WebsiteScrapeInput): Promise<WebsiteScrapeOutput> => {
	const { websiteUrl } = args
	console.log('websiteUrl', websiteUrl)
	const data = await extractBusinessData(websiteUrl)
	console.log('data', data)
	// const data = await User.findOne({ clerkId }).select('clerkId email firstName lastName profileImage createdAt updatedAt -_id').lean()
	// return data
}
