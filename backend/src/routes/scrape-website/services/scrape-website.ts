import { clerkClient } from '@clerk/fastify'
import { FastifyRequest } from 'fastify'
import mongoose from 'mongoose'
import { Business } from '../../../models'
import { BusinessUser } from '../../../models/BusinessUser'
import { BusinessData, ExtractError, extractBusinessData } from '../../../utils/extract-website-data'
import scrapeWebsiteContent from '../../../utils/scraping-website'
import { runTransaction } from '../../../utils/transaction'
import { WebsiteScrapeInput, WebsiteScrapeOutput } from './types'

export const websiteScrape = async (ctx: FastifyRequest, args: WebsiteScrapeInput): Promise<WebsiteScrapeOutput> => {
	const { websiteUrl } = args

	return await runTransaction(async (session) => {
		const scrapedContent = await scrapeWebsiteContent(websiteUrl)
		if (!scrapedContent) throw new Error('Failed to scrape website content')

		const data = await extractBusinessData(websiteUrl, scrapedContent)
		if ((data as ExtractError).error) {
			throw new Error(`AI extraction failed: ${(data as ExtractError).details || (data as ExtractError).error}`)
		}

		const businessData = data as BusinessData
		if (!businessData.name || !businessData.description) {
			throw new Error('Failed to extract valid business data (missing name or description)')
		}

		const ownerUserId = new mongoose.Types.ObjectId(ctx.context?.dbUserId!)

		const newBusiness = new Business({
			name: businessData.name,
			overview: businessData.description!,
			address: businessData.address ?? '',
			services: businessData.services ?? [],
			businessHours: businessData.business_hours ?? [],
			website: businessData.website,
			ownerUserId,
			isSetupComplete: true,
		})

		const businessMember = new BusinessUser({
			userId: ownerUserId,
			businessId: newBusiness._id,
			role: 'owner',
		})

		const [org] = await Promise.all([
			clerkClient.organizations.createOrganization({
				name: businessData.name,
				createdBy: ctx.context?.clerkId!,
			}),
			clerkClient.users.updateUserMetadata(ctx.context?.clerkId!, {
				publicMetadata: {
					dbUserId: ctx.context?.dbUserId!,
					clerkId: ctx.context?.clerkId!,
					businessId: (newBusiness._id as any).toString(),
					role: 'owner',
					selectedClientId: null,
				},
			}),
		])
		newBusiness.clerkOrganizationId = org.id
		await newBusiness.save({ session })
		await businessMember.save({ session })

		await clerkClient.users.updateUser(ctx.context?.clerkId!, {
			publicMetadata: {
				businessId: newBusiness._id,
				role: 'owner',
			},
		})
		return newBusiness
	})
}
