import { z } from 'zod'

//
export const getBusinessUserInvitationsByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type GetBusinessUserInvitationsByIdParamsSchemaInput = z.infer<typeof getBusinessUserInvitationsByIdParamsSchema>

//
export const createBusinessUserInvitationByIdParamsSchema = z.object({
	businessId: z.string(),
})
export const createBusinessUserInvitationByIdBodySchema = z.object({
	email: z.string(),
	role: z.enum(['editor', 'admin', 'viewer']),
})
export type CreateBusinessUserInvitationByIdSchemaInput = z.infer<typeof createBusinessUserInvitationByIdParamsSchema> &
	z.infer<typeof createBusinessUserInvitationByIdBodySchema>

//
export const revokeBusinessUserInvitationByTokenParamsSchema = z.object({
	invitationToken: z.string(),
})

export type RevokeBusinessUserInvitationByTokenSchemaInput = z.infer<typeof revokeBusinessUserInvitationByTokenParamsSchema>

//
export const acceptBusinessUserInvitationByIdBodySchema = z.object({
	userId: z.string(),
	invitationToken: z.string(),
})

export type AcceptBusinessUserInvitationByIdSchemaInput = z.infer<typeof acceptBusinessUserInvitationByIdBodySchema>
