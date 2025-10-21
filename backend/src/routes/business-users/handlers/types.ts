import { z } from 'zod'

export const getBusinessUsersByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type GetBusinessUsersByIdParamsSchemaInput = z.infer<typeof getBusinessUsersByIdParamsSchema>

//
export const inviteBusinessUserByIdParamsSchema = z.object({
	businessId: z.string(),
})
export const inviteBusinessUserByIdBodySchema = z.object({
	businessId: z.string(),
})
export type CreateBusinessUserByIdSchemaInput = z.infer<typeof inviteBusinessUserByIdBodySchema>
