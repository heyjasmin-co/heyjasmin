import { z } from 'zod'

export const getCallsByBusinessIdParamsSchemaInput = z.object({
	businessId: z.string(),
})
export type GetCallsByBusinessIdSchemaInput = z.infer<typeof getCallsByBusinessIdParamsSchemaInput>

//
export const getCallByIdParamsSchemaInput = z.object({
	callId: z.string(),
})
export const getCallByIdQuerySchemaInput = z.object({
	businessId: z.string(),
})
export type GetCallByIdSchemaInput = z.infer<typeof getCallByIdParamsSchemaInput> & z.infer<typeof getCallByIdQuerySchemaInput>
