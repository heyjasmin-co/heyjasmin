import { asyncHandler } from '../../../utils/asyncHandler'
import { BusinessService } from '../services'
import { createBusinessGoogleProfileBodySchema } from './types'

export const createBusinessGoogleProfileHandler = asyncHandler(async (request, reply) => {
	const body = createBusinessGoogleProfileBodySchema.parse(request.body)

	const websiteScrapeService = new BusinessService()
	const businessData = await websiteScrapeService.createBusinessGoogleProfile(request, body)

	return reply.status(200).send({
		success: true,
		message: 'Business created successfully',
		data: businessData,
	})
})
