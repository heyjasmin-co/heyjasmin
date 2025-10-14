import mongoose, { Document, Model, Schema } from 'mongoose'

interface IBusinessUser extends Document {
	businessId: mongoose.Types.ObjectId
	userId: mongoose.Types.ObjectId
	role: 'editor' | 'admin' | 'viewer'
	status: 'active' | 'pending' | 'removed'
	createdAt: Date
	updatedAt: Date
}

const businessUserSchema = new Schema<IBusinessUser>(
	{
		businessId: {
			type: Schema.Types.ObjectId,
			ref: 'Business',
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		role: {
			type: String,
			enum: ['editor', 'admin', 'viewer'],
			default: 'viewer',
			required: true,
		},

		status: {
			type: String,
			enum: ['active', 'pending', 'removed'],
			default: 'active',
		},
	},
	{
		timestamps: true,
	}
)

businessUserSchema.index({ businessId: 1, userId: 1 }, { unique: true })

const BusinessUser: Model<IBusinessUser> = mongoose.model<IBusinessUser>('BusinessUser', businessUserSchema)

export { BusinessUser, IBusinessUser }
