import { FastifyReply, FastifyRequest } from 'fastify'

type HandlerFunction = (req: FastifyRequest, reply: FastifyReply) => Promise<any>

export const asyncHandler = (fn: HandlerFunction) => {
	return async (req: FastifyRequest, reply: FastifyReply) => {
		try {
			return await fn(req, reply)
		} catch (error: any) {
			console.error('❌ Error in handler:', {
				message: error.message,
				stack: error.stack,
			})

			// Default error response
			let statusCode = 500
			let errorMessage = error.message || 'Internal server error'

			// Custom error mapping (you can expand this as needed)
			if (error.message?.includes('Invalid URL')) {
				statusCode = 400
				errorMessage = 'Invalid website URL provided.'
			} else if (error.message?.includes('Failed to scrape website content')) {
				statusCode = 503
				errorMessage = 'Unable to access the website. Please check the URL and try again.'
			} else if (error.message?.includes('AI extraction failed')) {
				statusCode = 502
				errorMessage = 'Failed to extract data from the website content.'
			} else if (error.message?.includes('Authentication failed')) {
				statusCode = 500
				errorMessage = 'Service configuration error. Please contact support.'
			}

			return reply.status(statusCode).send({
				success: false,
				error: errorMessage,
				details: process.env.NODE_ENV === 'development' ? error.message : undefined,
			})
		}
	}
}
