import { createUser } from './create-user'
import { getUserByClerkId } from './get-user-by-clerk-id'
import { me } from './me'

export class UserService {
	getUserByClerkId = getUserByClerkId
	createUser = createUser
	me = me
}
