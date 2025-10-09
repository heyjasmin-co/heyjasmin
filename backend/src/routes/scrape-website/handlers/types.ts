import { z } from 'zod'

export const websiteScrapeBodySchema = z.object({
	websiteUrl: z.string(),
})
export type WebsiteScrapeBodySchemaInput = z.infer<typeof websiteScrapeBodySchema>
