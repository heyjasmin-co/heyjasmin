import { z } from 'zod'

export const getBusinessDetailsByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type GetBusinessDetailsByIdParamsSchemaInput = z.infer<typeof getBusinessDetailsByIdParamsSchema>

//Update Business Details
export const updateBusinessDetailsByIdBodySchema = z.object({
	name: z.string().trim().optional(),
	overview: z.string().optional(),
	address: z.string().optional(),
	website: z.string().url().optional(),

	services: z.array(z.string().trim()).optional(),

	businessHours: z
		.array(
			z.object({
				day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
				start: z.string().optional(),
				end: z.string().optional(),
				isOpen: z.boolean().optional(),
			})
		)
		.optional(),

	stripeCustomerId: z.string().optional(),
	stripeSubscriptionId: z.string().nullable().optional(),
	subscriptionStatus: z.enum(['trialing', 'active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid']).optional(),
	subscriptionPlan: z.enum(['core', 'pro', 'smart', 'infinity']).optional(),
	subscriptionStartDate: z.date().nullable().optional(),
	subscriptionEndDate: z.date().nullable().optional(),

	ownerUserId: z.string().optional(),

	aiAgentSettings: z
		.object({
			agentId: z.string().optional(),
			agentNumber: z.string().optional(),
			trainingData: z.record(z.any()).optional(),
			voiceSettings: z.record(z.any()).optional(),
			customInstructions: z.string().optional(),
		})
		.optional(),
})
export const updateBusinessDetailsByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type UpdateBusinessDetailsByIdBodySchemaInput = z.infer<typeof updateBusinessDetailsByIdBodySchema> &
	z.infer<typeof updateBusinessDetailsByIdParamsSchema>

//Update Business Information
export const updateBusinessInformationByIdBodySchema = z.object({
	name: z.string().trim().optional(),
	overview: z.string().optional(),
	address: z.string().optional(),
})
export const updateBusinessInformationByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type UpdateBusinessInformationByIdBodySchemaInput = z.infer<typeof updateBusinessInformationByIdBodySchema> &
	z.infer<typeof updateBusinessInformationByIdParamsSchema>

// Update Business Services
export const updateBusinessServicesByIdBodySchema = z.object({
	services: z.array(z.string().trim()),
})
export const updateBusinessServicesByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type UpdateBusinessServicesByIdBodySchemaInput = z.infer<typeof updateBusinessServicesByIdBodySchema> &
	z.infer<typeof updateBusinessServicesByIdParamsSchema>

// Update Business Hours
export const updateBusinessHoursByIdBodySchema = z.object({
	businessHours: z.array(
		z.object({
			day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
			start: z.string(),
			end: z.string(),
			isOpen: z.boolean(),
		})
	),
})
export const updateBusinessHoursByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type UpdateBusinessHoursByIdBodySchemaInput = z.infer<typeof updateBusinessHoursByIdBodySchema> &
	z.infer<typeof updateBusinessHoursByIdParamsSchema>
