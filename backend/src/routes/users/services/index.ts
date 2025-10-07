import { createUser } from './create-user'
import { getUserByClerkId } from './get-user-by-clerk-id'

export class UserService {
	getUserByClerkId = getUserByClerkId
	createUser = createUser
}
