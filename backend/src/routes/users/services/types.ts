import { FastifyRequest } from 'fastify'
import { IBusiness, IBusinessUser, IUser } from '../../../models'
import { getUserByClerkIdParamsSchema, selectUserBusinessSchema } from '../handlers/types'

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

//
export type MeUserInput = FastifyRequest
export type MeUserOutput = {
	dbUserId?: string | null
	clerkId?: string | null
	businessId?: string | null
	isSetupComplete?: boolean | null
	hasSubscription?: boolean | null
	role?: string | null
}

//
export type GetUserBusinessesInput = FastifyRequest
export type GetUserBusinessesOutput = {
	_id: string
	role: IBusinessUser['role']
	businessId: string
	businessName: IBusiness['name']
}[]

//
export type SelectUserBusinessInput = typeof selectUserBusinessSchema._type
export type SelectUserBusinessOutput = void
