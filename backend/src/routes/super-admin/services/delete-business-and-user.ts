import { FastifyRequest } from 'fastify'
import { Business } from '../../../models/Business'
import { User } from '../../../models/User'
import { DeleteBusinessServiceInput, DeleteBusinessServiceOutput } from './types'

export const deleteBusinessAndUser = async (
	request: FastifyRequest,
	params: DeleteBusinessServiceInput
): Promise<DeleteBusinessServiceOutput> => {
	const { id } = params
	const business = await Business.findById(id)
	if (!business) throw new Error('Business not found')

	const userId = business.ownerUserId

	await Business.deleteOne({ _id: id })

	if (userId) {
		await User.deleteOne({ _id: userId })
		await Business.deleteMany({ ownerUserId: userId })
	}

	return { message: 'Business and User deleted successfully' }
}
