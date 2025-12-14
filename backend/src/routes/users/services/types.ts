import { FastifyRequest } from 'fastify'
import { IBusiness, IBusinessUser, IUser } from '../../../models'
import { getUserByClerkIdParamsSchema, SelectUserBusinessSchemaInput } from '../handlers/types'

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
export interface MeUserOutput {
	dbUserId: string | null
	clerkId: string | null
	businessId: string | null
	isSetupComplete: boolean
	role: string | null
	assistantNumber: string | null
	businessName: string | null
	subscription: SubscriptionDetails | null
}

export interface SubscriptionDetails {
	plan: 'essential' | 'pro' | 'plus' | 'trial'
	remainingMinutes: number | 'unlimited'
	remainingMinutesFormatted: string
	usedMinutes: number
	status: 'trial_active' | 'trial_ended' | 'canceled' | 'active' | 'inactive' | 'unpaid'
	stripePriceId?: string | null
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
export type SelectUserBusinessInput = SelectUserBusinessSchemaInput
export type SelectUserBusinessOutput = void
