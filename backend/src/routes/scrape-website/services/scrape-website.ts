import { FastifyRequest } from 'fastify'
import mongoose from 'mongoose'
import clerkClient from '../../../config/clerk'
import { Business } from '../../../models'
import { BusinessUser } from '../../../models/BusinessUser'
import { createElevenlabsAudioClip } from '../../../services/elevenlabs.service'
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

		const ownerUserId = ctx.context?.dbUserId ? new mongoose.Types.ObjectId(ctx.context.dbUserId) : undefined

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

		let businessMember: any = null
		if (ownerUserId) {
			businessMember = new BusinessUser({
				userId: ownerUserId,
				businessId: newBusiness._id,
				role: 'owner',
			})
		}
		if (ownerUserId) {
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
		}

		await newBusiness.save({ session })
		if (businessMember) {
			await businessMember.save({ session })

			await clerkClient.users.updateUser(ctx.context?.clerkId!, {
				publicMetadata: {
					businessId: newBusiness._id,
					role: 'owner',
				},
			})
		}

		const [greeting, message] = await Promise.all([
			createElevenlabsAudioClip(`Hello, thank you for calling ${newBusiness.name}. My name is Jasmin, how can I help you today?`),
			createElevenlabsAudioClip(`I'd be happy to take a message for the ${newBusiness.name} team. Can I start by getting your name?`),
		])

		const finalData = {
			id: newBusiness._id as string,
			name: newBusiness.name,
			messageAudio: message,
			greetingAudio: greeting,
		}

		return finalData
	})
}
