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

// Update Business Setup
export const updateBusinessAssistantSetupByIdBodySchema = z.object({
	assistantSetup: z.enum(['testing', 'completed']),
})
export const updateBusinessAssistantSetupByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type UpdateBusinessAssistantSetupByIdBodySchemaInput = z.infer<typeof updateBusinessAssistantSetupByIdBodySchema> &
	z.infer<typeof updateBusinessAssistantSetupByIdParamsSchema>

// Update Business Assistant
export const updateBusinessAssistantByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type UpdateBusinessAssistantByIdSchemaInput = z.infer<typeof updateBusinessAssistantByIdParamsSchema>

// Create Business Google Profile
export const createBusinessGoogleProfileBodySchema = z.object({
	name: z.string({ required_error: 'Business name is required' }).min(1, 'Please provide your business name'),

	overview: z.string().optional(),

	address: z.string({ required_error: 'Business address is required' }).min(1, 'Please provide a valid business address'),

	website: z
		.string({ required_error: 'Website URL is required' })
		.url('Please enter a valid website URL (e.g., https://example.com)')
		.optional(),

	service: z.array(z.string().min(1, 'Each service must have a name')).min(1, 'Please specify at least one service you offer'),

	business_hours: z
		.array(z.string().min(1, 'Business hours entry cannot be empty'))
		.min(1, 'Please include at least one business hours entry'),
})
export type CreateBusinessGoogleProfileSchemaInput = z.infer<typeof createBusinessGoogleProfileBodySchema>
