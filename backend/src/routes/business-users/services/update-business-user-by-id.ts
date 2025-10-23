import { FastifyRequest } from 'fastify'
import { BusinessUser } from '../../../models'
import { UpdateBusinessUsersByIdInput, UpdateBusinessUsersByIdOutput } from './types'

export const updateBusinessUsersById = async (
	request: FastifyRequest,
	args: UpdateBusinessUsersByIdInput
): Promise<UpdateBusinessUsersByIdOutput> => {
	const { businessUserId, role } = args

	const businessUser = await BusinessUser.findByIdAndUpdate(businessUserId, { role }, { new: true })

	return businessUser as UpdateBusinessUsersByIdOutput
}
