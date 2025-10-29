import { IBusiness } from '../../../models'
import {
	GetBusinessDetailsByIdParamsSchemaInput,
	UpdateBusinessAssistantByIdSchemaInput,
	UpdateBusinessAssistantSetupByIdBodySchemaInput,
	UpdateBusinessDetailsByIdBodySchemaInput,
	UpdateBusinessHoursByIdBodySchemaInput,
	UpdateBusinessInformationByIdBodySchemaInput,
	UpdateBusinessServicesByIdBodySchemaInput,
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

//
export type UpdateBusinessServicesByIdInput = UpdateBusinessServicesByIdBodySchemaInput
export type UpdateBusinessServicesByIdOutput = string[] | null

//
export type UpdateBusinessHoursByIdInput = UpdateBusinessHoursByIdBodySchemaInput
export type UpdateBusinessHoursByIdOutput = IBusiness['businessHours'] | null

//
export type UpdateBusinessAssistantSetupByIdInput = UpdateBusinessAssistantSetupByIdBodySchemaInput
export type UpdateBusinessAssistantSetupByIdOutput = IBusiness['aiAgentSettings'] | null

//
export type UpdateBusinessAssistantByIdInput = UpdateBusinessAssistantByIdSchemaInput
export type UpdateBusinessAssistantByIdOutput = IBusiness | null
