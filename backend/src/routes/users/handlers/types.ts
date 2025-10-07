import { z } from 'zod'

export const getUserByClerkIdParamsSchema = z.object({
	clerkId: z.string(),
})
export type GetUserByClerkIdParamsSchemaInput = z.infer<typeof getUserByClerkIdParamsSchema>
