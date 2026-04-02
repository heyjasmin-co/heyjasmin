import { IBusinessCallNotification } from '../../../models/BusinessNotification'
import {
	BusinessIdParamsSchemaInput,
	CreateRecipientBodySchemaInput,
	RecipientIdParamsSchemaInput,
	RecipientTypeParamsSchemaInput,
	UpdateRecipientBodySchemaInput,
	UpdateToggleBodySchemaInput,
} from '../handlers/types'

export type GetSettingsInput = BusinessIdParamsSchemaInput
export type GetSettingsOutput = IBusinessCallNotification | null

export type UpdateEmailToggleInput = BusinessIdParamsSchemaInput & UpdateToggleBodySchemaInput
export type UpdateEmailToggleOutput = IBusinessCallNotification | null

export type UpdateTextToggleInput = BusinessIdParamsSchemaInput & UpdateToggleBodySchemaInput
export type UpdateTextToggleOutput = IBusinessCallNotification | null

export type AddRecipientInput = RecipientTypeParamsSchemaInput & CreateRecipientBodySchemaInput
export type AddRecipientOutput = IBusinessCallNotification | null

export type UpdateRecipientInput = RecipientIdParamsSchemaInput & UpdateRecipientBodySchemaInput
export type UpdateRecipientOutput = IBusinessCallNotification | null

export type DeleteRecipientInput = RecipientIdParamsSchemaInput
export type DeleteRecipientOutput = IBusinessCallNotification | null
