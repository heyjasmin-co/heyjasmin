import dotenv from 'dotenv'
dotenv.config()

const config = {
	PORT: Number(process.env.PORT) || 3000,
	HOST: process.env.HOST || '0.0.0.0',
	NODE_ENV: process.env.NODE_ENV || 'development',
	LOG_LEVEL: process.env.LOG_LEVEL || 'info',

	// MongoDB
	MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-agent-app',

	// Stripe
	STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
	STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
	STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,

	// Clerk
	CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
	CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
	CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
}

export default config
