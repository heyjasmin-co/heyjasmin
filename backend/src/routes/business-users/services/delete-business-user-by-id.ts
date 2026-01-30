import { FastifyRequest } from 'fastify'
import { BusinessUser } from '../../../models'
import { DeleteBusinessUserInput, DeleteBusinessUserOutput } from './types'

export const deleteBusinessUserById = async (request: FastifyRequest, args: DeleteBusinessUserInput): Promise<DeleteBusinessUserOutput> => {
	const { businessUserId } = args

	const user = await BusinessUser.findByIdAndDelete(businessUserId)
	if (!user) throw new Error('Business user not found')
	request.log.info('Business user deleted successfully')
	return user as DeleteBusinessUserOutput
}
