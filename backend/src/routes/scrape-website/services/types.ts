import { websiteScrapeBodySchema } from '../handlers/types'

export type WebsiteScrapeInput = typeof websiteScrapeBodySchema._type
export type WebsiteScrapeOutput = {
	name: string
	messageAudio: string
	greetingAudio: string
} | null
