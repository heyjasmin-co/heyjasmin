import mongoose, { Document, Model, Schema } from 'mongoose'

interface ICall extends Document {
	businessId: mongoose.Schema.Types.ObjectId
	callId: string
	callerPhone: string
	callerName: string
	duration: number
	status: 'completed' | 'missed' | 'voicemail' | 'in_progress'
	transcript: string
	summary: string
	sentiment: 'positive' | 'neutral' | 'negative'
	recordingUrl: string
	callStartTime: Date
	callEndTime?: Date
	createdAt: Date
	updatedAt: Date
}

const callSchema = new Schema<ICall>(
	{
		businessId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Business',
			required: true,
		},

		// Call Details
		callId: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		callerPhone: {
			type: String,
			required: true,
			trim: true,
		},
		callerName: {
			type: String,
			default: '',
			trim: true,
		},
		duration: {
			type: Number,
			default: 0,
		},
		status: {
			type: String,
			enum: ['completed', 'missed', 'voicemail', 'in_progress'],
			default: 'completed',
		},

		// Call Content
		transcript: {
			type: String,
			default: '',
		},
		summary: {
			type: String,
			default: '',
		},
		sentiment: {
			type: String,
			enum: ['positive', 'neutral', 'negative'],
			default: 'neutral',
		},

		// Recording
		recordingUrl: {
			type: String,
			default: '',
		},

		// Metadata
		callStartTime: {
			type: Date,
			required: true,
		},
		callEndTime: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
)

callSchema.index({ businessId: 1, callStartTime: -1 })
callSchema.index({ businessId: 1, status: 1 })

const Call: Model<ICall> = mongoose.model<ICall>('Call', callSchema)

export { Call, ICall }
