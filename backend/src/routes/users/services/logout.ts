import { clerkClient } from '@clerk/fastify'
import { FastifyRequest } from 'fastify'

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
