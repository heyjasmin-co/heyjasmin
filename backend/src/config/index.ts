import dotenv from 'dotenv'

dotenv.config()
interface Config {
	PORT: number
	HOST: string
	NODE_ENV: string
	LOG_LEVEL: string
	MONGODB_URI: string
	STRIPE_SECRET_KEY?: string
	STRIPE_WEBHOOK_SECRET?: string
	STRIPE_PUBLISHABLE_KEY?: string
	CLERK_PUBLISHABLE_KEY: string
	CLERK_SECRET_KEY: string
	CLERK_WEBHOOK_SECRET: string
	OPENAI_API_KEY: string
	FRONTEND_URL: string
	VAPI_API_KEY: string
	TWILIO_ACCOUNT_SID: string
	TWILIO_AUTH_TOKEN: string
	BACKEND_URL: string
	ELEVENLABS_API_KEY: string
}

const config: Config = {
	PORT: Number(process.env.PORT) || 3000,
	HOST: process.env.HOST || '0.0.0.0',
	NODE_ENV: process.env.NODE_ENV || 'development',
	LOG_LEVEL: process.env.LOG_LEVEL || 'info',

	// MongoDB
	MONGODB_URI: process.env.MONGODB_URI!,

	// Stripe
	STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
	STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
	STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,

	// Clerk
	CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY!,
	CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,
	CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET!,

	//OPEN_AI
	OPENAI_API_KEY: process.env.OPENAI_API_KEY!,

	//FRONTEND_URL
	FRONTEND_URL: process.env.FRONTEND_URL!,
	//BACKEND_URL
	BACKEND_URL: process.env.BACKEND_URL!,

	//VAPI
	VAPI_API_KEY: process.env.VAPI_API_KEY!,

	//VAPI
	TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID!,
	TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN!,

	//ELEVENLABS
	ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY!,
}

export default config
