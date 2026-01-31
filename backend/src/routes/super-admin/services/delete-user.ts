import { FastifyRequest } from 'fastify'
import clerkClient from '../../../config/clerk'
import { Business, BusinessUser, Call, User } from '../../../models'
import { runTransaction } from '../../../utils/transaction'
import { deleteBusinessAndUser } from './delete-business-and-user'

export const deleteUser = async (request: FastifyRequest, params: { id: string }): Promise<{ message: string }> => {
	const { id } = params

	return await runTransaction(async (session) => {
		const user = await User.findById(id).session(session)
		if (!user) throw new Error('User not found')

		// Find all businesses owned by the user
		const businesses = await Business.find({ ownerUserId: id }).session(session)

		// Delete each business (with resource cleanup)
		for (const business of businesses) {
			await deleteBusinessAndUser(request, { id: (business._id as any).toString() }, session)
		}

		// Double check and cleanup any orphaned BusinessUser or Call records
		await BusinessUser.deleteMany({ userId: id }, { session })
		await Call.deleteMany({ businessId: { $in: businesses.map((b) => b._id) } }, { session })

		// Delete from Clerk
		try {
			await clerkClient.users.deleteUser(user.clerkId)
		} catch (error: any) {
			request.log.warn(`Failed to delete user ${user.clerkId} from Clerk: ${error.message}`)
		}

		// Delete local user
		await User.deleteOne({ _id: id }, { session })

		return { message: 'User and all associated data deleted successfully' }
	})
}
