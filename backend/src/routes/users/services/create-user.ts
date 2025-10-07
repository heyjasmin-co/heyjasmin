import { User } from '../../../models'
import { CreateUserInput, CreateUserOutput } from './types'

export const createUser = async (args: CreateUserInput): Promise<CreateUserOutput> => {
	try {
		const user = new User({
			...args,
		})
		const savedUser = await user.save()
		return savedUser
	} catch (error) {
		throw error
	}
}
