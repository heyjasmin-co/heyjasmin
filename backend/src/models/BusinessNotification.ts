import mongoose, { Document, Model, Schema } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

interface ICallNotificationRecipient {
	id: string
	value: string
}

interface IBusinessCallNotification extends Document {
	businessId: mongoose.Types.ObjectId
	emailNotificationsEnabled: boolean
	textNotificationsEnabled: boolean
	emailRecipients: ICallNotificationRecipient[]
	textRecipients: ICallNotificationRecipient[]
	createdAt: Date
	updatedAt: Date
}

const notificationRecipientSchema = new Schema<ICallNotificationRecipient>(
	{
		id: { type: String, required: true },
		value: { type: String, required: true },
	},
	{ _id: false }
)

const businessCallNotificationSchema = new Schema<IBusinessCallNotification>(
	{
		businessId: {
			type: Schema.Types.ObjectId,
			ref: 'Business',
			required: true,
			index: true,
		},
		emailNotificationsEnabled: {
			type: Boolean,
			default: true,
		},
		textNotificationsEnabled: {
			type: Boolean,
			default: true,
		},
		emailRecipients: [notificationRecipientSchema],
		textRecipients: [notificationRecipientSchema],
	},
	{ timestamps: true }
)

businessCallNotificationSchema.plugin(aggregatePaginate)

const BusinessCallNotification: Model<IBusinessCallNotification> = mongoose.model<IBusinessCallNotification>(
	'BusinessCallNotification',
	businessCallNotificationSchema
)

export { BusinessCallNotification, IBusinessCallNotification }
