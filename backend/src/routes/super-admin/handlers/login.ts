import { asyncHandler } from '../../../utils/asyncHandler'
import { SuperAdminService } from '../services'
import { loginBodySchema } from './types'

export const loginHandler = asyncHandler(async (request, reply) => {
	const body = loginBodySchema.parse(request.body)
	const superAdminService = new SuperAdminService()
	const data = await superAdminService.login(request, body)

	return reply.status(200).send({
		success: true,
		...data,
	})
})
