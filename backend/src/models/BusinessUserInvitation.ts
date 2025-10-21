import mongoose, { Document, Model, Schema } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

interface IBusinessUserInvitation extends Document {
	businessId: mongoose.Types.ObjectId
	clerKInvitationId: string
	email: string
	role: 'editor' | 'admin' | 'viewer'
	status: 'active' | 'pending' | 'removed'
	createdAt: Date
	updatedAt: Date
}

const businessUserInvitationSchema = new Schema<IBusinessUserInvitation>(
	{
		businessId: {
			type: Schema.Types.ObjectId,
			ref: 'Business',
			required: true,
		},
		clerKInvitationId: {
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
			enum: ['active', 'pending', 'removed'],
			default: 'active',
		},
	},
	{
		timestamps: true,
	}
)

businessUserInvitationSchema.index({ businessId: 1, clerKInvitationId: 1 }, { unique: true })
businessUserInvitationSchema.plugin(aggregatePaginate)

const BusinessUserInvitation: Model<IBusinessUserInvitation> = mongoose.model<IBusinessUserInvitation>(
	'BusinessUserInvitation',
	businessUserInvitationSchema
)

export { BusinessUserInvitation, IBusinessUserInvitation }
