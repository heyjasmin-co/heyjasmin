import { Business } from '../../../models/Business'
import { User } from '../../../models/User'
import { GetUsersServiceInput, GetUsersServiceOutput } from './types'

export const getUsers = async (input: GetUsersServiceInput): Promise<GetUsersServiceOutput> => {
	const { page, limit } = input
	const skip = (page - 1) * limit

	const query: any = {}

	const [users, total] = await Promise.all([
		User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
		User.countDocuments(query),
	])

	const usersWithBusinessCount = await Promise.all(
		users.map(async (user) => {
			const businessCount = await Business.countDocuments({ ownerUserId: user._id })
			return {
				...user,
				_id: (user._id as any).toString(),
				businessCount,
			}
		})
	)

	return {
		users: usersWithBusinessCount as any,
		total,
		pages: Math.ceil(total / limit),
		currentPage: page,
	}
}
