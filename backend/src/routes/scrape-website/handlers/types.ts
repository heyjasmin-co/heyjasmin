import { z } from 'zod'

export const websiteScrapeBodySchema = z.object({
	websiteUrl: z
		.string()
		.url({ message: 'Invalid website URL format' }) // ✅ ensures it's a valid URL
		.refine((url) => /^https?:\/\//.test(url), {
			message: 'Website URL must start with http:// or https://',
		}),
})

export type WebsiteScrapeBodySchemaInput = z.infer<typeof websiteScrapeBodySchema>
