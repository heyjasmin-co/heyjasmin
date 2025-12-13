import mongoose, { Document, Model, Schema } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

export interface IBusinessPlan extends Document {
	businessId: mongoose.Types.ObjectId

	subscriptionStatus: 'active' | 'inactive' | 'canceled' | 'unpaid'

	subscriptionPlan?: 'essential' | 'pro' | 'plus'
	stripeSubscriptionId?: string | null
	stripePriceId?: string | null

	subscriptionStartDate: Date
	subscriptionEndDate?: Date | null

	createdAt: Date
	updatedAt: Date
}

const businessPlanSchema = new Schema<IBusinessPlan>(
	{
		businessId: {
			type: Schema.Types.ObjectId,
			ref: 'Business',
			required: true,
			index: true,
		},

		subscriptionStatus: {
			type: String,
			enum: ['active', 'inactive', 'canceled', 'unpaid'],
			required: true,
		},

		subscriptionPlan: {
			type: String,
			enum: ['essential', 'pro', 'plus'],
			default: null,
		},

		stripeSubscriptionId: {
			type: String,
			default: null,
			index: true,
			sparse: true,
		},

		stripePriceId: {
			type: String,
			default: null,
		},

		subscriptionStartDate: {
			type: Date,
			default: Date.now,
			required: true,
		},

		subscriptionEndDate: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
)

// Pagination
businessPlanSchema.plugin(aggregatePaginate)

const BusinessPlan: Model<IBusinessPlan> = mongoose.model<IBusinessPlan>('BusinessPlan', businessPlanSchema)

export { BusinessPlan }
