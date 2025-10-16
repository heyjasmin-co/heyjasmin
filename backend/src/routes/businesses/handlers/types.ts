import { z } from 'zod'

export const getBusinessDetailsByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type GetBusinessDetailsByIdParamsSchemaInput = z.infer<typeof getBusinessDetailsByIdParamsSchema>
