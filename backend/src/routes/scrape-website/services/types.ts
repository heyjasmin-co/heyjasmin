import { IBusiness } from '../../../models'
import { websiteScrapeBodySchema } from '../handlers/types'

export type WebsiteScrapeInput = typeof websiteScrapeBodySchema._type
export type WebsiteScrapeOutput = IBusiness
