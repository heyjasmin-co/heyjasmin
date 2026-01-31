import { changeEmail } from './change-email'
import { changePassword } from './change-password'
import { deleteBusinessAndUser } from './delete-business-and-user'
import { forgotPassword } from './forgot-password'
import { getBusinesses } from './get-businesses'
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
	deleteBusinessAndUser = deleteBusinessAndUser
}
