import { IBusinessUser } from '../../../models'
import {
	DeleteBusinessUserByIdSchemaInput,
	GetBusinessUsersByIdParamsSchemaInput,
	UpdateBusinessUserByIdSchemaInput,
} from '../handlers/types'

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

//
export type DeleteBusinessUserInput = DeleteBusinessUserByIdSchemaInput
export type DeleteBusinessUserOutput = IBusinessUser | null

//
export type UpdateBusinessUsersByIdInput = UpdateBusinessUserByIdSchemaInput
export type UpdateBusinessUsersByIdOutput = IBusinessUser | null
