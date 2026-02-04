import { changeEmail } from './change-email'
import { changePassword } from './change-password'
import { deleteBusinessAndUser } from './delete-business-and-user'
import { deleteUser } from './delete-user'
import { forgotPassword } from './forgot-password'
import { getBusinesses } from './get-businesses'
import { getUsers } from './get-users'
import { login } from './login'
import { resetPassword } from './reset-password'
import { signup } from './signup'
import { verifyEmailChange } from './verify-email-change'

export class SuperAdminService {
	signup = signup
	login = login
	forgotPassword = forgotPassword
	resetPassword = resetPassword
	changePassword = changePassword
	changeEmail = changeEmail
	verifyEmailChange = verifyEmailChange
	getBusinesses = getBusinesses
	getUsers = getUsers
	deleteBusinessAndUser = deleteBusinessAndUser
	deleteUser = deleteUser
}
