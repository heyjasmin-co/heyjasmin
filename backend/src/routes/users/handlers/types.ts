import { z } from 'zod'

export const getUserByClerkIdParamsSchema = z.object({
	clerkId: z.string(),
})
export type GetUserByClerkIdParamsSchemaInput = z.infer<typeof getUserByClerkIdParamsSchema>

//
export const selectUserBusinessParamsSchema = z.object({
	businessId: z.string(),
})
export const selectUserBusinessBodySchema = z.object({
	role: z.string(),
})
export type SelectUserBusinessSchemaInput = z.infer<typeof selectUserBusinessParamsSchema> & z.infer<typeof selectUserBusinessBodySchema>
