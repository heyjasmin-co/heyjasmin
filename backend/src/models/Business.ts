import mongoose, { Document, Model, Schema } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

interface IBusinessHour {
	day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
	start: string
	end: string
	isOpen: boolean
}

interface IBusiness extends Document {
	name: string
	hasPublish: boolean
	overview?: string
	address?: string
	website?: string
	services: string[]
	businessHours: IBusinessHour[]

	stripeCustomerId?: string | null

	totalCallMinutes: number

	ownerUserId?: mongoose.Types.ObjectId
	aiAgentSettings: {
		assistantId?: string
		assistantName?: string
		assistantPhoneNumberId?: string | null
		assistantSetup?: string
		assistantCallTransferToolId?: string | null
		assistantSmsToolId?: string | null
		twilioNumber?: string
		twilioId?: string
	}
	appointmentSettings: {
		appointmentEnabled: boolean
		appointmentMessage: string | null
		schedulingLink: string | null
	}
	callTransferSettings: {
		scenarios: {
			scenarioId: string
			scenario: string
			transferTo: string
			warmTransfer: boolean
			availability: 'always' | 'business_hours' | 'custom' | 'none'
			customHours?: {
				day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
				start: string
				end: string
				isOpen: boolean
			}[]
		}[]
	}
	isSetupComplete: boolean
	createdAt: Date
	updatedAt: Date
}

const businessSchema = new Schema<IBusiness>(
	{
		// Basic Info
		name: { type: String, required: true, trim: true },
		hasPublish: { type: Boolean, default: false },
		overview: { type: String, default: '' },
		address: { type: String, default: '' },
		website: { type: String, default: '' },

		// Services
		services: [{ type: String, trim: true }],

		// Business Hours
		businessHours: [
			{
				day: {
					type: String,
					enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
					required: true,
				},
				start: { type: String, default: '09:00' },
				end: { type: String, default: '17:00' },
				isOpen: { type: Boolean, default: true },
			},
		],

		// Stripe
		stripeCustomerId: {
			type: String,
			default: null,
		},

		// Owner
		ownerUserId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			index: true,
		},

		//Call Usage
		totalCallMinutes: { type: Number, default: 0 },

		// AI Agent Settings
		aiAgentSettings: {
			assistantId: { type: String, default: null },
			assistantPhoneNumberId: { type: String, default: null },
			assistantSetup: { type: String, default: null },
			assistantName: { type: String, default: null },
			assistantCallTransferToolId: { type: String, default: null },
			assistantSmsToolId: { type: String, default: null },
			twilioNumber: { type: String, default: null },
			twilioId: { type: String, default: null },
		},

		// Appointment Settings
		appointmentSettings: {
			appointmentEnabled: { type: Boolean, default: false },
			appointmentMessage: { type: String, default: null },
			schedulingLink: { type: String, default: null },
		},

		//Call Transfer Settings
		callTransferSettings: {
			scenarios: [
				{
					scenarioId: { type: String, required: true },
					scenario: { type: String, required: true },
					transferTo: { type: String, required: true },
					warmTransfer: { type: Boolean, default: false },
					availability: {
						type: String,
						enum: ['always', 'business_hours', 'custom', 'none'],
						default: 'always',
					},
					customHours: [
						{
							day: {
								type: String,
								enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
								required: true,
							},
							start: { type: String },
							end: { type: String },
							isOpen: { type: Boolean, default: true },
						},
					],
				},
			],
		},
		// Setup Status
		isSetupComplete: { type: Boolean, default: false },
	},
	{ timestamps: true }
)

businessSchema.plugin(aggregatePaginate)

const Business: Model<IBusiness> = mongoose.model<IBusiness>('Business', businessSchema)

export { Business, IBusiness }
