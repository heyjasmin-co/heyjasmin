import { FastifyRequest } from 'fastify'
import { createBusinessFromData } from '../../../helper/createBusinessFromData'
import { BusinessData, extractBusinessData, ExtractError } from '../../../utils/extract-website-data'
import { CreateBusinessGoogleProfileInput, CreateBusinessGoogleProfileOutput } from './types'

export const CreateBusinessGoogleProfile = async (
	request: FastifyRequest,
	args: CreateBusinessGoogleProfileInput
): Promise<CreateBusinessGoogleProfileOutput> => {
	const { website, ...scrapedContent } = args
	const data = await extractBusinessData(website ?? '', '', scrapedContent)
	if ((data as ExtractError).error) {
		throw new Error(`AI extraction failed: ${(data as ExtractError).details || (data as ExtractError).error}`)
	}
	const dbUserId = request.context?.dbUserId
	const clerkId = request.context?.clerkId
	return await createBusinessFromData({ data: data as BusinessData, dbUserId, clerkId })
	// return await runTransaction(async (session) => {
	// 	const businessData = data as BusinessData
	// 	if (!businessData.name || !businessData.description) {
	// 		throw new Error('Failed to extract valid business data (missing name or description)')
	// 	}

	// 	const ownerUserId = request.context?.dbUserId ? new mongoose.Types.ObjectId(request.context.dbUserId) : undefined

	// 	const newBusiness = new Business({
	// 		name: businessData.name,
	// 		overview: businessData.description!,
	// 		address: businessData.address ?? '',
	// 		services: businessData.services ?? [],
	// 		businessHours: businessData.business_hours ?? [],
	// 		website: businessData.website,
	// 		ownerUserId,
	// 		isSetupComplete: true,
	// 	})

	// 	let businessMember: any = null
	// 	if (ownerUserId) {
	// 		businessMember = new BusinessUser({
	// 			userId: ownerUserId,
	// 			businessId: newBusiness._id,
	// 			role: 'owner',
	// 		})
	// 	}
	// 	if (ownerUserId) {
	// 		const [org] = await Promise.all([
	// 			clerkClient.organizations.createOrganization({
	// 				name: businessData.name,
	// 				createdBy: request.context?.clerkId!,
	// 			}),
	// 			clerkClient.users.updateUserMetadata(request.context?.clerkId!, {
	// 				publicMetadata: {
	// 					dbUserId: request.context?.dbUserId!,
	// 					clerkId: request.context?.clerkId!,
	// 					businessId: (newBusiness._id as any).toString(),
	// 					role: 'owner',
	// 					selectedClientId: null,
	// 				},
	// 			}),
	// 		])
	// 		newBusiness.clerkOrganizationId = org.id
	// 	}

	// 	await newBusiness.save({ session })
	// 	if (businessMember) {
	// 		await businessMember.save({ session })

	// 		await clerkClient.users.updateUser(request.context?.clerkId!, {
	// 			publicMetadata: {
	// 				businessId: newBusiness._id,
	// 				role: 'owner',
	// 			},
	// 		})
	// 	}

	// 	const [greeting, message] = await Promise.all([
	// 		createElevenlabsAudioClip(`Hello, thank you for calling ${newBusiness.name}. My name is Jasmin, how can I help you today?`),
	// 		createElevenlabsAudioClip(`I'd be happy to take a message for the ${newBusiness.name} team. Can I start by getting your name?`),
	// 	])

	// 	const finalData = {
	// 		id: newBusiness._id as string,
	// 		name: newBusiness.name,
	// 		messageAudio: message,
	// 		greetingAudio: greeting,
	// 	}

	// 	return finalData
	// })
}
