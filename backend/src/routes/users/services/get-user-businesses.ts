import mongoose from 'mongoose'
import { BusinessUser } from '../../../models/BusinessUser'
import { GetUserBusinessesInput, GetUserBusinessesOutput } from './types'

export const getUserBusinesses = async (request: GetUserBusinessesInput): Promise<GetUserBusinessesOutput> => {
	const context = request.context

	const userBusinesses = await BusinessUser.aggregate([
		{
			$match: {
				userId: new mongoose.Types.ObjectId(context?.dbUserId!),
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
		{
			$unwind: '$business',
		},
		{
			$project: {
				_id: 1,
				role: 1,
				businessId: '$business._id',
				businessName: '$business.name',
			},
		},
	])

	return userBusinesses
}
