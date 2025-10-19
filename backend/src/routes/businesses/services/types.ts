import { IBusiness } from '../../../models'
import {
	GetBusinessDetailsByIdParamsSchemaInput,
	UpdateBusinessDetailsByIdBodySchemaInput,
	UpdateBusinessInformationByIdBodySchemaInput,
} from '../handlers/types'

export type GetBusinessDetailsInput = GetBusinessDetailsByIdParamsSchemaInput
export type GetBusinessDetailOutput = IBusiness | null

//
export type UpdateBusinessDetailsByIdInput = UpdateBusinessDetailsByIdBodySchemaInput
export type UpdateBusinessDetailsByIdOutput = IBusiness | null

//
export type UpdateBusinessInformationByIdInput = UpdateBusinessInformationByIdBodySchemaInput
export type UpdateBusinessInformationByIdOutput = {
	name: string
	overview?: string
	address?: string
} | null
