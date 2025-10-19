import { z } from 'zod'

export const getBusinessUsersByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type GetBusinessUsersByIdParamsSchemaInput = z.infer<typeof getBusinessUsersByIdParamsSchema>
