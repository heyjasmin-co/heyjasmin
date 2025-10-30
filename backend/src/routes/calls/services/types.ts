import { ICall } from '../../../models'
import { GetCallByIdSchemaInput, GetCallsByBusinessIdSchemaInput } from '../handlers/types'

export type GetCallsByBusinessIdInput = GetCallsByBusinessIdSchemaInput
export type GetCallsByBusinessIdOutput = ICall[] | null

//
export type GetCallByIdInput = GetCallByIdSchemaInput
export type GetCallByIdOutput = ICall | null
