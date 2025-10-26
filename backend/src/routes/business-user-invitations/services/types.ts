import { IBusinessUser } from '../../../models'
import { IBusinessUserInvitation } from '../../../models/BusinessUserInvitation'
import {
	AcceptBusinessUserInvitationByIdSchemaInput,
	CreateBusinessUserInvitationByIdSchemaInput,
	GetBusinessUserInvitationsByIdParamsSchemaInput,
	RevokeBusinessUserInvitationByIdSchemaInput,
} from '../handlers/types'

//
export type GetBusinessUserInvitationsInput = GetBusinessUserInvitationsByIdParamsSchemaInput
export type GetBusinessUserInvitationsOutput = IBusinessUserInvitation[] | null

//
export type CreateBusinessUserInvitationInput = CreateBusinessUserInvitationByIdSchemaInput
export type CreateBusinessUserInvitationOutput = IBusinessUserInvitation | null

//
export type RevokeBusinessUserInvitationInput = RevokeBusinessUserInvitationByIdSchemaInput
export type RevokeBusinessUserInvitationOutput = IBusinessUserInvitation | null

//
export type AcceptBusinessUserInvitationInput = AcceptBusinessUserInvitationByIdSchemaInput
export type AcceptBusinessUserInvitationOutput = IBusinessUser | null
