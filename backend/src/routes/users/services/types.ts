import { IUser } from '../../../models'
import { getUserByClerkIdParamsSchema } from '../handlers/types'

//
export type GetUserByClerkIdInput = typeof getUserByClerkIdParamsSchema._type
export type GetUserByClerkIdOutput = IUser | null

//
export type CreateUserInput = {
	clerkId: string
	email: string
	firstName: string
	lastName: string
	profileImage: string
}
export type CreateUserOutput = IUser
