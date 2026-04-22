import mongoose, { Document, Model, Schema } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

export interface ITrial extends Document {
	businessId: mongoose.Types.ObjectId
	trialStartedAt: Date
	trialEndDate?: Date
	trialStatus: string
	expiryReminderSent?: boolean
	createdAt: Date
	updatedAt: Date
}

const trialSchema = new Schema<ITrial>(
	{
		businessId: {
			type: Schema.Types.ObjectId,
			ref: 'Business',
			required: true,
			index: true,
		},
		trialStartedAt: {
			type: Date,
			required: true,
			default: Date.now,
		},
		trialEndDate: {
			type: Date,
		},
		trialStatus: {
			type: String,
			enum: ['trial_active', 'trial_ended'],
			default: 'trial_active',
		},
		expiryReminderSent: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

// Pagination plugin
trialSchema.plugin(aggregatePaginate)

const Trial: Model<ITrial> = mongoose.model<ITrial>('Trial', trialSchema)

export { Trial }
