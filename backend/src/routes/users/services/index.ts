import { createUser } from './create-user'
import { getUserByClerkId } from './get-user-by-clerk-id'
import { getUserBusinesses } from './get-user-businesses'
import { logout } from './logout'
import { me } from './me'
import { selectUserBusiness } from './select-user-business'

export class UserService {
	getUserByClerkId = getUserByClerkId
	createUser = createUser
	me = me
	logout = logout
	getUserBusinesses = getUserBusinesses
	selectUserBusiness = selectUserBusiness
}
