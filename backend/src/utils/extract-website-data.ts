import config from '../config'

export interface BusinessHours {
	day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
	start: string
	end: string
	isOpen: boolean
}

export interface BusinessData {
	name: string
	description: string
	address: string | null
	email: string | null
	services: string[] | null
	business_hours: BusinessHours[] | null
	website: string
}

export interface ExtractError {
	error: string
	details?: string
}

// Default business hours (Mon–Fri open, Sat–Sun closed)
function getDefaultBusinessHours(): BusinessHours[] {
	return [
		{ day: 'Monday', start: '09:00 AM', end: '05:00 PM', isOpen: true },
		{ day: 'Tuesday', start: '09:00 AM', end: '05:00 PM', isOpen: true },
		{ day: 'Wednesday', start: '09:00 AM', end: '05:00 PM', isOpen: true },
		{ day: 'Thursday', start: '09:00 AM', end: '05:00 PM', isOpen: true },
		{ day: 'Friday', start: '09:00 AM', end: '05:00 PM', isOpen: true },
		{ day: 'Saturday', start: '09:00 AM', end: '05:00 PM', isOpen: false },
		{ day: 'Sunday', start: '09:00 AM', end: '05:00 PM', isOpen: false },
	]
}

// Generate fallback description
function generateDescription(parsed: any, content: string): string {
	const name = parsed.name || 'This business'
	const services =
		Array.isArray(parsed.services) && parsed.services.length > 0
			? parsed.services.slice(0, 3).join(', ')
			: 'various products and services'

	const lowerContent = content.toLowerCase()

	if (lowerContent.includes('restaurant') || lowerContent.includes('menu')) {
		return `${name} is a restaurant offering ${services}. They provide quality food with dine-in and delivery options.`
	}
	if (lowerContent.includes('shop') || lowerContent.includes('store') || lowerContent.includes('retail')) {
		return `${name} is a retail store specializing in ${services}. They focus on providing excellent products to their customers.`
	}
	if (lowerContent.includes('service') || lowerContent.includes('repair')) {
		return `${name} provides professional ${services} services with a focus on quality and customer satisfaction.`
	}
	return `${name} offers ${services}. They are committed to delivering quality and value to their customers.`
}

// Get name from URL or description if missing
function inferBusinessName(parsed: any, url: string): string | null {
	if (parsed.name && parsed.name.trim()) return parsed.name.trim()

	try {
		const domain = new URL(url).hostname.replace('www.', '')
		const nameFromDomain = domain.split('.')[0]
		if (nameFromDomain && nameFromDomain.length > 2) return nameFromDomain.charAt(0).toUpperCase() + nameFromDomain.slice(1)
	} catch {
		// ignore URL parsing errors
	}

	// fallback: use first 3 words from description
	if (parsed.description) {
		const words = parsed.description.split(' ').slice(0, 3).join(' ')
		if (words.length > 0) return words
	}

	return null
}

export async function extractBusinessData(url: string, websiteContent: string): Promise<BusinessData | ExtractError> {
	if (!config.OPENAI_API_KEY) {
		return { error: 'API key not configured', details: 'OPENAI_API_KEY environment variable is missing' }
	}

	if (!websiteContent || websiteContent.trim().length === 0) {
		return { error: 'No website content provided', details: 'The scraped content is empty' }
	}

	const truncatedContent = websiteContent.slice(0, 10000)

	const prompt = `
You are a structured data extraction assistant.
Extract the following fields from the provided business website content.

Fields:
- name: Business name (string or null)
- description: 2-3 sentence description summarizing what the business offers and their main services (string, REQUIRED)
- address: Physical address (string or null)
- email: Contact email (string or null)
- services: Array of services/products offered (array of strings or null)
- business_hours: Array of objects (if mentioned) with structure:
  { "day": "Monday", "start": "09:00 AM", "end": "05:00 PM", "isOpen": true }
- website: The website URL (use: ${url})

Instructions:
1. If business hours are clearly mentioned, extract them as they are.
2. Do not invent hours. If not found, leave business_hours as null.
3. Return ONLY a valid JSON object, no markdown or text.

Website Content:
${truncatedContent}
`

	try {
		// HTTP request instead of OpenAI SDK
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.OPENAI_API_KEY}`,
				'Content-Type': 'application/json',
				'OpenAI-Project': config.OPENAI_AI_PROJECT_ID,
			},
			body: JSON.stringify({
				model: config.OPENAI_AI_MODEL,
				messages: [{ role: 'user', content: prompt }],
				temperature: 0.3,
			}),
		})

		if (!response.ok) {
			const errorData = await response.text()
			console.error('❌ OpenAI API Error:', response.status, errorData)
			return {
				error: 'OpenAI API request failed',
				details: `${response.status}: ${errorData}`,
			}
		}

		const data = await response.json()
		const raw = data.choices?.[0]?.message?.content?.trim()
		if (!raw) return { error: 'Empty response from AI', details: 'The AI returned no content' }

		let jsonStr = raw
		const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
		if (match) jsonStr = match[1]

		let parsed: any
		try {
			parsed = JSON.parse(jsonStr)
		} catch {
			return { error: 'Invalid JSON returned from model', details: 'Failed to parse JSON' }
		}

		// Fallback name logic
		parsed.name = inferBusinessName(parsed, url)

		// Fallback description
		const description =
			parsed.description && parsed.description.trim().length > 0
				? parsed.description.trim()
				: generateDescription(parsed, truncatedContent)

		// Business hours: either extracted or default
		const businessHours =
			Array.isArray(parsed.business_hours) && parsed.business_hours.length > 0 ? parsed.business_hours : getDefaultBusinessHours()

		return {
			name: parsed.name,
			description,
			address: parsed.address ?? null,
			email: parsed.email ?? null,
			services: Array.isArray(parsed.services) ? parsed.services : null,
			business_hours: businessHours,
			website: url,
		} as BusinessData
	} catch (err: any) {
		console.error('❌ AI Extraction Error:', err.message)
		return {
			error: 'Failed to extract business data',
			details: err.message || 'Unknown error occurred',
		}
	}
}
