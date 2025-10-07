import mongoose, { Document, Schema, Model } from 'mongoose'

interface IBusinessUser extends Document {
	businessId: mongoose.Types.ObjectId
	userId: mongoose.Types.ObjectId
	role: 'editor' | 'admin' | 'viewer'
	invitedBy?: mongoose.Types.ObjectId
	invitedAt?: Date
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
		invitedBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		invitedAt: {
			type: Date,
			default: Date.now,
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
