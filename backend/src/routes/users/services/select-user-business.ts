import { clerkClient } from '@clerk/fastify'
import { FastifyRequest } from 'fastify'
import { SelectUserBusinessInput, SelectUserBusinessOutput } from './types'

export const selectUserBusiness = async (request: FastifyRequest, args: SelectUserBusinessInput): Promise<SelectUserBusinessOutput> => {
	const context = request.context
	const { businessId, role } = args
	console.log({ businessId, role })
	await clerkClient.users.updateUser(context?.clerkId!, {
		publicMetadata: {
			businessId,
			role,
		},
	})
}
