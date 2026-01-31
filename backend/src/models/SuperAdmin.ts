import bcrypt from 'bcrypt'
import mongoose, { Document, Schema } from 'mongoose'

export interface ISuperAdmin extends Document {
	email: string
	password?: string
	resetPasswordToken?: string
	resetPasswordExpires?: Date
	pendingEmail?: string
	emailChangeToken?: string
	emailChangeExpires?: Date
	comparePassword(candidatePassword: string): Promise<boolean>
}

const SuperAdminSchema: Schema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		resetPasswordToken: { type: String },
		resetPasswordExpires: { type: Date },
		pendingEmail: { type: String },
		emailChangeToken: { type: String },
		emailChangeExpires: { type: Date },
	},
	{ timestamps: true }
)

SuperAdminSchema.pre<ISuperAdmin>('save', async function (next) {
	if (!this.isModified('password') || !this.password) return next()

	try {
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
		next()
	} catch (err: any) {
		next(err)
	}
})

SuperAdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
	if (!this.password) return false
	return bcrypt.compare(candidatePassword, this.password)
}

export const SuperAdmin = mongoose.model<ISuperAdmin>('SuperAdmin', SuperAdminSchema)
