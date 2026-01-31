import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'

export const getBusinessesHandler = asyncHandler(async (request, reply) => {
	const superAdminService = new SuperAdminService()
	const businesses = await superAdminService.getBusinesses(request)

	return reply.status(200).send({
		success: true,
		businesses,
	})
})
