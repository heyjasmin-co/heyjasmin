import { FastifyRequest } from 'fastify'
import mongoose from 'mongoose'
import clerkClient from '../../../config/clerk'
import { Business, BusinessUser } from '../../../models'
import { BusinessData, extractBusinessData, ExtractError } from '../../../utils/extract-website-data'
import { runTransaction } from '../../../utils/transaction'
import { CreateBusinessGoogleProfileInput, CreateBusinessGoogleProfileOutput } from './types'

export const CreateBusinessGoogleProfile = async (
	request: FastifyRequest,
	args: CreateBusinessGoogleProfileInput
): Promise<CreateBusinessGoogleProfileOutput> => {
	const { website, ...scrapedContent } = args
	return await runTransaction(async (session) => {
		const data = await extractBusinessData(website ?? '', '', scrapedContent)
		if ((data as ExtractError).error) {
			throw new Error(`AI extraction failed: ${(data as ExtractError).details || (data as ExtractError).error}`)
		}

		const businessData = data as BusinessData
		if (!businessData.name || !businessData.description) {
			throw new Error('Failed to extract valid business data (missing name or description)')
		}

		const ownerUserId = new mongoose.Types.ObjectId(request.context?.dbUserId!)

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
				createdBy: request.context?.clerkId!,
			}),
			clerkClient.users.updateUserMetadata(request.context?.clerkId!, {
				publicMetadata: {
					dbUserId: request.context?.dbUserId!,
					clerkId: request.context?.clerkId!,
					businessId: (newBusiness._id as any).toString(),
					role: 'owner',
					selectedClientId: null,
				},
			}),
		])
		newBusiness.clerkOrganizationId = org.id
		await newBusiness.save({ session })
		await businessMember.save({ session })

		await clerkClient.users.updateUser(request.context?.clerkId!, {
			publicMetadata: {
				businessId: newBusiness._id,
				role: 'owner',
			},
		})
		return newBusiness
	})
}
