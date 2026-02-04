import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'
import { getBusinessesQuerySchema } from './types'

export const getBusinessesHandler = asyncHandler(async (request, reply) => {
	const query = getBusinessesQuerySchema.parse(request.query)
	const superAdminService = new SuperAdminService()
	const data = await superAdminService.getBusinesses(request, query)

	return reply.status(200).send({
		success: true,
		...data,
	})
})
