import { GetBusinessUsersByIdParamsSchemaInput } from '../handlers/types'

export type GetBusinessUsersInput = GetBusinessUsersByIdParamsSchemaInput
export type GetBusinessUsersOutput =
	| {
			_id: string
			role: string
			status: string
			email: string
			name: string
			businessName: string
	  }[]
	| null
