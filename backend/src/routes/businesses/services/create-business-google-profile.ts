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
}
