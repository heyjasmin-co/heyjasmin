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

	// Stripe Settings nested
	stripeSettings: z
		.object({
			stripeCustomerId: z.string().nullable().optional(),
			stripeSubscriptionId: z.string().nullable().optional(),
			subscriptionStatus: z.enum(['trial_active', 'trial_end', 'active', 'inactive', 'canceled', 'unpaid']).optional(),
			subscriptionPlan: z.enum(['essential', 'pro', 'plus']).nullable().optional(),
			stripePriceId: z.string().nullable().optional(),
			subscriptionStartDate: z.date().nullable().optional(),
			subscriptionEndDate: z.date().nullable().optional(),
		})
		.optional(),

	ownerUserId: z.string().optional(),

	// AI Agent Settings nested
	aiAgentSettings: z
		.object({
			assistantId: z.string().optional(),
			assistantPhoneNumberId: z.string().optional(),
			assistantSetup: z.string().optional(),
			assistantName: z.string().optional(),
			twilioNumber: z.string().optional(),
			twilioId: z.string().optional(),
			trainingData: z.record(z.any()).optional(),
			voiceSettings: z.record(z.any()).optional(),
			customInstructions: z.string().optional(),
		})
		.optional(),

	clerkOrganizationId: z.string().optional(),
	isSetupComplete: z.boolean().optional(),
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

	business_hours: z.array(z.string().min(1, 'Business hours entry cannot be empty')).optional(),
})
export type CreateBusinessGoogleProfileSchemaInput = z.infer<typeof createBusinessGoogleProfileBodySchema>

//Update Business Appointment
export const updateBusinessAppointmentByIdBodySchema = z.object({
	appointmentEnabled: z.boolean(),
	appointmentMessage: z.string().optional(),
	schedulingLink: z.string().optional(),
})
export const updateBusinessAppointmentByIdParamsSchema = z.object({
	businessId: z.string(),
})
export type UpdateBusinessAppointmentByIdBodySchemaInput = z.infer<typeof updateBusinessAppointmentByIdBodySchema> &
	z.infer<typeof updateBusinessAppointmentByIdParamsSchema>
