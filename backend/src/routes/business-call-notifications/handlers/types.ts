import { z } from 'zod'

export const businessIdParamsSchema = z.object({
	businessId: z.string().min(1),
})
export type BusinessIdParamsSchemaInput = z.infer<typeof businessIdParamsSchema>

//Update Toggle Body Schema
export const updateToggleBodySchema = z.object({
	enabled: z.boolean(),
})
export type UpdateToggleBodySchemaInput = z.infer<typeof updateToggleBodySchema>

//Recipient Type Params Schema
export const recipientTypeParamsSchema = businessIdParamsSchema.extend({
	type: z.enum(['email', 'text']),
})
export type RecipientTypeParamsSchemaInput = z.infer<typeof recipientTypeParamsSchema>

//Recipient Id Params Schema
export const recipientIdParamsSchema = recipientTypeParamsSchema.extend({
	recipientId: z.string().min(1),
})
export type RecipientIdParamsSchemaInput = z.infer<typeof recipientIdParamsSchema>

//Create Recipient Body Schema
export const createRecipientBodySchema = z.object({
	id: z.string().min(1),
	value: z.string().min(1),
})
export type CreateRecipientBodySchemaInput = z.infer<typeof createRecipientBodySchema>

//Update Recipient Body Schema
export const updateRecipientBodySchema = z.object({
	value: z.string().min(1),
})
export type UpdateRecipientBodySchemaInput = z.infer<typeof updateRecipientBodySchema>
