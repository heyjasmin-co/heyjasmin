import { FastifyRequest } from 'fastify'
import { SelectUserBusinessInput, SelectUserBusinessOutput } from './types'
import clerkClient from '../../../config/clerk'

export const selectUserBusiness = async (request: FastifyRequest, args: SelectUserBusinessInput): Promise<SelectUserBusinessOutput> => {
	const context = request.context
	const { businessId, role } = args

	await clerkClient.users.updateUser(context?.clerkId!, {
		publicMetadata: {
			businessId,
			role,
		},
	})
}
