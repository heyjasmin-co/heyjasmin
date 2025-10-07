import { UserService } from '../routes/users/services'

export const handleUserCreated = async (clerkUser: any) => {
	try {
		const userData = {
			clerkId: clerkUser.id,
			email: clerkUser.email_addresses[0]?.email_address,
			firstName: clerkUser.first_name,
			lastName: clerkUser.last_name,
			profileImage: clerkUser.has_image ? clerkUser.image_url : '',
		}

		const userService = new UserService()
		const user = await userService.createUser(userData)

		return {
			success: true,
			data: user,
		}
	} catch (error) {
		console.error('Error creating user from webhook:', error)
		throw new Error('Failed to create user from webhook')
	}
}
