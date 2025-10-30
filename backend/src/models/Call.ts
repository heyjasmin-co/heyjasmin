import mongoose, { Document, Model, Schema } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

interface ICall extends Document {
	businessId: mongoose.Schema.Types.ObjectId
	callId: string
	summary: string
	status: 'completed' | 'missed' | 'voicemail' | 'in_progress'
	recordingUrl: string
	durationMs?: number
	durationSeconds?: number
	durationMinutes?: number
	customerPhoneNumber?: string
	createdAt: Date
	updatedAt: Date
}
const callSchema = new Schema<ICall>(
	{
		status: {
			type: String,
			enum: ['completed', 'missed', 'voicemail', 'in_progress'],
			default: 'completed',
		},

		businessId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Business',
			required: true,
		},
		callId: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		summary: {
			type: String,
			default: '',
			trim: true,
		},
		recordingUrl: {
			type: String,
			default: '',
			trim: true,
		},
		durationMs: {
			type: Number,
			default: 0,
		},
		durationSeconds: {
			type: Number,
			default: 0,
		},
		durationMinutes: {
			type: Number,
			default: 0,
		},
		customerPhoneNumber: {
			type: String,
			default: '',
			trim: true,
		},
	},
	{
		timestamps: true,
	}
)

callSchema.plugin(aggregatePaginate)

const Call: Model<ICall> = mongoose.model<ICall>('Call', callSchema)

export { Call, ICall }
