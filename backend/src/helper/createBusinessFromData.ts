import mongoose from 'mongoose'
import clerkClient from '../config/clerk'
import { Business, BusinessUser } from '../models'
import { Trial } from '../models/Trial'
import { createElevenlabsAudioClip } from '../services/elevenlabs.service'
import { BusinessData } from '../utils/extract-website-data'
import { runTransaction } from '../utils/transaction'

export const createBusinessFromData = async ({
	data,
	dbUserId,
	clerkId,
}: {
	data: BusinessData
	dbUserId?: string | null
	clerkId?: string | null
}) => {
	return await runTransaction(async (session) => {
		const businessData = data as BusinessData
		if (!businessData.name || !businessData.description) {
			throw new Error('Failed to extract valid business data (missing name or description)')
		}

		const ownerUserId = dbUserId ? new mongoose.Types.ObjectId(dbUserId) : undefined

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
		const businessTrial = new Trial({
			businessId: newBusiness._id,
			trialStartedAt: new Date(),
			trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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
					createdBy: clerkId!,
				}),
				clerkClient.users.updateUserMetadata(clerkId!, {
					publicMetadata: {
						dbUserId: dbUserId!,
						clerkId: clerkId!,
						businessId: (newBusiness._id as any).toString(),
						role: 'owner',
						selectedClientId: null,
					},
				}),
			])
			newBusiness.clerkOrganizationId = org.id
		}

		await newBusiness.save({ session })
		await businessTrial.save({ session })
		if (businessMember) {
			await businessMember.save({ session })

			await clerkClient.users.updateUser(clerkId!, {
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
