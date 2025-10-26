import { deleteBusinessUserById } from './delete-business-user-by-id'
import { getBusinessUsersById } from './get-business-users-by-id'
import { updateBusinessUsersById } from './update-business-user-by-id'

export class BusinessUsersService {
	getBusinessUsersById = getBusinessUsersById
	deleteBusinessUserById = deleteBusinessUserById
	updateBusinessUsersById = updateBusinessUsersById
}
