import { z } from 'zod'

//
export const getBusinessUsersByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type GetBusinessUsersByIdParamsSchemaInput = z.infer<typeof getBusinessUsersByIdParamsSchema>

//
export const deleteBusinessUserByIdParamsSchema = z.object({
	businessUserId: z.string(),
})
export type DeleteBusinessUserByIdSchemaInput = z.infer<typeof deleteBusinessUserByIdParamsSchema>

//
export const updateBusinessUserByIdParamsSchema = z.object({
	businessUserId: z.string(),
})
export const updateBusinessUserByIdBodySchema = z.object({
	role: z.string(),
})
export type UpdateBusinessUserByIdSchemaInput = z.infer<typeof updateBusinessUserByIdParamsSchema> &
	z.infer<typeof updateBusinessUserByIdBodySchema>
