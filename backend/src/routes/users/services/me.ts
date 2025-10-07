import { User } from '../../../models'
import { GetUserByClerkIdInput, GetUserByClerkIdOutput } from './types'

export const getUserByClerkId = async (args: GetUserByClerkIdInput): Promise<GetUserByClerkIdOutput> => {
	const { clerkId } = args
	const data = await User.findOne({ clerkId })
	return data
}
