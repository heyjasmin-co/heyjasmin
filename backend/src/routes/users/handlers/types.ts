import { z } from 'zod'

export const getUserByClerkIdParamsSchema = z.object({
	clerkId: z.string(),
})
export type GetUserByClerkIdParamsSchemaInput = z.infer<typeof getUserByClerkIdParamsSchema>

//
export const selectUserBusinessSchema = z.object({
	businessId: z.string(),
})
export type SelectUserBusinessSchemaInput = z.infer<typeof selectUserBusinessSchema>
