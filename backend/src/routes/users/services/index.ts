import { createUser } from './create-user'
import { getUserByClerkId } from './get-user-by-clerk-id'
import { getUserBusinesses } from './getUserBusinesses'
import { logout } from './logout'
import { me } from './me'
import { selectUserBusiness } from './selectUserBusiness'

export class UserService {
	getUserByClerkId = getUserByClerkId
	createUser = createUser
	me = me
	logout = logout
	getUserBusinesses = getUserBusinesses
	selectUserBusiness = selectUserBusiness
}
