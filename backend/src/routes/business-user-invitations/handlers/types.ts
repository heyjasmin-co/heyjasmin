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
export const revokeBusinessUserInvitationByIdParamsSchema = z.object({
	invitationId: z.string(),
})

export type RevokeBusinessUserInvitationByIdSchemaInput = z.infer<typeof revokeBusinessUserInvitationByIdParamsSchema>

//
export const acceptBusinessUserInvitationByIdBodySchema = z.object({
	userId: z.string(),
	businessId: z.string(),
	role: z.string(),
	clerkOrganizationId: z.string(),
	clerkUserId: z.string(),
})

export type AcceptBusinessUserInvitationByIdSchemaInput = z.infer<typeof acceptBusinessUserInvitationByIdBodySchema>
