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
	overview?: string
	address?: string
	website: string
	services: string[]
	businessHours: IBusinessHour[]
	stripeCustomerId?: string | null
	stripeSubscriptionId?: string | null
	subscriptionStatus?: 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'unpaid'
	subscriptionPlan?: 'core' | 'pro' | 'smart' | 'infinity'
	subscriptionStartDate?: Date | null
	subscriptionEndDate?: Date | null
	ownerUserId: mongoose.Types.ObjectId
	aiAgentSettings: {
		trainingData?: Record<string, any>
		voiceSettings?: Record<string, any>
		customInstructions?: string
	}
	isSetupComplete: boolean
	createdAt: Date
	updatedAt: Date
}

const businessSchema = new Schema<IBusiness>(
	{
		// Basic Info
		name: {
			type: String,
			required: true,
			trim: true,
		},
		overview: {
			type: String,
			default: '',
		},
		address: {
			type: String,
			default: '',
		},
		website: {
			type: String,
			required: true,
		},

		// Services
		services: [
			{
				type: String,
				trim: true,
			},
		],

		// Business Hours
		businessHours: [
			{
				day: {
					type: String,
					enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
					required: true,
				},
				start: {
					type: String,
					default: '09:00',
				},
				end: {
					type: String,
					default: '17:00',
				},
				isOpen: {
					type: Boolean,
					default: true,
				},
			},
		],

		// Stripe & Subscription
		stripeCustomerId: {
			type: String,
			unique: true,
			sparse: true,
		},
		stripeSubscriptionId: {
			type: String,
			default: null,
		},
		subscriptionStatus: {
			type: String,
			enum: ['trialing', 'active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid'],
			default: 'trialing',
		},
		subscriptionPlan: {
			type: String,
			enum: ['core', 'pro', 'smart', 'infinity'],
			default: 'core',
		},
		subscriptionStartDate: {
			type: Date,
			default: null,
		},
		subscriptionEndDate: {
			type: Date,
			default: null,
		},

		// Owner
		ownerUserId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		// AI Agent Settings
		aiAgentSettings: {
			trainingData: {
				type: Schema.Types.Mixed,
				default: {},
			},
			voiceSettings: {
				type: Schema.Types.Mixed,
				default: {},
			},
			customInstructions: {
				type: String,
				default: '',
			},
		},

		// Setup Status
		isSetupComplete: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

businessSchema.index({ name: 1 })
businessSchema.index({ ownerUserId: 1 })
businessSchema.plugin(aggregatePaginate)

const Business: Model<IBusiness> = mongoose.model<IBusiness>('Business', businessSchema)

export { Business, IBusiness }
