import { FastifyRequest } from 'fastify'
import mongoose from 'mongoose'
import { BusinessUser } from '../../../models'
import { GetBusinessUsersInput, GetBusinessUsersOutput } from './types'

export const getBusinessUsersById = async (request: FastifyRequest, args: GetBusinessUsersInput): Promise<GetBusinessUsersOutput> => {
	const { businessId } = args

	if (!businessId || !mongoose.Types.ObjectId.isValid(businessId)) {
		throw new Error('Invalid or missing businessId.')
	}

	const businessUsers = await BusinessUser.aggregate([
		{
			$match: {
				businessId: new mongoose.Types.ObjectId(businessId),
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
				name: {
					$trim: {
						input: {
							$concat: [{ $ifNull: ['$user.firstName', ''] }, ' ', { $ifNull: ['$user.lastName', ''] }],
						},
					},
				},
				clerkOrganizationId: '$business.clerkOrganizationId',
				businessName: '$business.name',
			},
		},
	])

	return businessUsers as GetBusinessUsersOutput
}
