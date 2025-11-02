import { FastifyRequest } from 'fastify'
import clerkClient from '../../../config/clerk'

export const logout = async (request: FastifyRequest): Promise<void> => {
	const context = request.context

	await clerkClient.users.updateUserMetadata(context?.clerkId!, {
		publicMetadata: {
			dbUserId: null,
			clerkId: null,
			businessId: null,
			role: null,
			selectedClientId: null,
		},
	})
}
