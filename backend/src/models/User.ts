import mongoose, { Document, Model, Schema } from 'mongoose'
export interface IUser extends Document {
	clerkId: string
	email: string
	firstName: string
	lastName: string
	profileImage: string
	createdAt: Date
	updatedAt: Date
}

const userSchema = new Schema<IUser>(
	{
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},

		firstName: {
			type: String,
			required: true,
			trim: true,
		},

		lastName: {
			type: String,
			default: '',
		},

		profileImage: {
			type: String,
			default: '',
		},
	},
	{
		timestamps: true,
	}
)

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export { User }
