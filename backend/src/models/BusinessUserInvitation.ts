import mongoose, { Document, Model, Schema } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

interface IBusinessUserInvitation extends Document {
	businessId: mongoose.Types.ObjectId
	invitationToken: string
	email: string
	role: 'editor' | 'admin' | 'viewer'
	status: 'active' | 'pending' | 'removed' | 'accepted' | 'expired'
	createdAt: Date
	updatedAt: Date
	expiresAt: Date
}

const businessUserInvitationSchema = new Schema<IBusinessUserInvitation>(
	{
		businessId: {
			type: Schema.Types.ObjectId,
			ref: 'Business',
			required: true,
		},
		invitationToken: {
			type: String,
			required: true,
		},
		email: {
			type: String,
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
			enum: ['active', 'pending', 'removed', 'accepted', 'expired'],
			default: 'active',
		},
		expiresAt: {
			type: Date,
			default: Date.now() + 24 * 60 * 60 * 1000,
		},
	},
	{
		timestamps: true,
	}
)

businessUserInvitationSchema.index({ businessId: 1, invitationToken: 1 }, { unique: true })
businessUserInvitationSchema.plugin(aggregatePaginate)

const BusinessUserInvitation: Model<IBusinessUserInvitation> = mongoose.model<IBusinessUserInvitation>(
	'BusinessUserInvitation',
	businessUserInvitationSchema
)

export { BusinessUserInvitation, IBusinessUserInvitation }
