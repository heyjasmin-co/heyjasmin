import { FastifyRequest } from 'fastify'
import mongoose from 'mongoose'
import clerkClient from '../../../config/clerk'
import { BusinessUser } from '../../../models'
import { runTransaction } from '../../../utils/transaction'
import { DeleteBusinessUserInput, DeleteBusinessUserOutput } from './types'

export const deleteBusinessUserById = async (request: FastifyRequest, args: DeleteBusinessUserInput): Promise<DeleteBusinessUserOutput> => {
	const { businessUserId } = args

	// Fetch business user with related user & business info
	const [businessUser] = await BusinessUser.aggregate([
		{
			$match: {
				_id: new mongoose.Types.ObjectId(businessUserId),
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: 'userId',
				foreignField: '_id',
				as: 'user',
			},
		},
		{
			$lookup: {
				from: 'businesses',
				localField: 'businessId',
				foreignField: '_id',
				as: 'business',
			},
		},
		{ $unwind: '$user' },
		{ $unwind: '$business' },
		{
			$project: {
				_id: 1,
				role: 1,
				status: 1,
				email: '$user.email',
				clerkUserId: '$user.clerkId',
				clerkOrganizationId: '$business.clerkOrganizationId',
				businessName: '$business.name',
			},
		},
	])

	if (!businessUser) {
		throw new Error('Business user not found')
	}

	try {
		const deletedUser = await runTransaction(async (session) => {
			const user = await BusinessUser.findByIdAndDelete(businessUserId).session(session)
			if (!user) throw new Error('Failed to delete from database')

			await clerkClient.organizations.deleteOrganizationMembership({
				organizationId: businessUser.clerkOrganizationId,
				userId: businessUser.clerkUserId,
			})

			return user
		})
		return deletedUser as DeleteBusinessUserOutput
	} catch (error: any) {
		try {
			await clerkClient.organizations.createOrganizationMembership({
				organizationId: businessUser.clerkOrganizationId,
				userId: businessUser.clerkUserId,
				role: businessUser.role || 'basic_member',
			})
		} catch (restoreError) {
			console.error('⚠️ Failed to restore Clerk membership:', restoreError)
		}

		throw new Error('Failed to delete business user. Membership restored.')
	}
}
