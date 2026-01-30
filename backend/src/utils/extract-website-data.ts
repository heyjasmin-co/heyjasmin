import config from '../config'
import { openai } from '../lib/openAIModel'

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
	business_hours?: BusinessHours[] | null
	website: string
}

export interface ExtractError {
	error: string
	details?: string
}

export interface GooglePlaceData {
	name?: string
	formatted_address?: string
	website?: string
	business_hours?: string[] // Array like ["Monday: 11:00 AM – 10:00 PM", ...]
	types?: string[]
	editorial_summary?: string
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

// Parse Google Business hours format: "Monday: 11:00 AM – 10:00 PM" or "Monday: Closed"
function parseGoogleBusinessHours(hours: string[]): BusinessHours[] {
	const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
	const parsedHours: BusinessHours[] = []

	for (const day of daysOfWeek) {
		const hourString = hours.find((h) => h.startsWith(day))

		if (!hourString) {
			// Day not found, use default
			parsedHours.push({ day: day as any, start: '09:00 AM', end: '05:00 PM', isOpen: false })
			continue
		}

		// Check if closed
		if (hourString.toLowerCase().includes('closed')) {
			parsedHours.push({ day: day as any, start: '09:00 AM', end: '05:00 PM', isOpen: false })
			continue
		}

		// Parse format: "Monday: 11:00 AM – 10:00 PM"
		const timeMatch = hourString.match(/:\s*(.+?)\s*[–-]\s*(.+)/)
		if (timeMatch) {
			const [, start, end] = timeMatch
			parsedHours.push({
				day: day as any,
				start: start.trim(),
				end: end.trim(),
				isOpen: true,
			})
		} else {
			// Fallback
			parsedHours.push({ day: day as any, start: '09:00 AM', end: '05:00 PM', isOpen: true })
		}
	}

	return parsedHours
}

// Generate fallback description
function generateDescription(parsed: any, content: string, googleData?: GooglePlaceData): string {
	// First try Google's editorial summary
	if (googleData?.editorial_summary) {
		return googleData.editorial_summary
	}

	const name = parsed.name || googleData?.name || 'This business'
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
function inferBusinessName(parsed: any, url: string, googleData?: GooglePlaceData): string | null {
	// First priority: Google Business name
	if (googleData?.name && googleData.name.trim()) {
		return googleData.name.trim()
	}

	// Second priority: AI extracted name
	if (parsed.name && parsed.name.trim()) return parsed.name.trim()

	// Third priority: domain name
	try {
		const domain = new URL(url).hostname.replace('www.', '')
		const nameFromDomain = domain.split('.')[0]
		if (nameFromDomain && nameFromDomain.length > 2) {
			return nameFromDomain.charAt(0).toUpperCase() + nameFromDomain.slice(1)
		}
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

export async function extractBusinessData(
	url: string,
	websiteContent: string,
	googleData?: GooglePlaceData
): Promise<BusinessData | ExtractError> {
	if (!config.OPENAI_API_KEY) {
		return { error: 'API key not configured', details: 'OPENAI_API_KEY environment variable is missing' }
	}

	// Allow empty website content if we have Google data
	const hasContent = websiteContent && websiteContent.trim().length > 0
	const hasGoogleData = googleData && Object.keys(googleData).length > 0

	if (!hasContent && !hasGoogleData) {
		return { error: 'No data provided', details: 'Need either website content or Google Business data' }
	}

	const truncatedContent = hasContent ? websiteContent.slice(0, 10000) : ''

	// Build context from Google data if available
	let googleContext = ''
	if (hasGoogleData) {
		googleContext = `
===== GOOGLE BUSINESS PROFILE DATA (PRIORITIZE THIS) =====
- Business Name: ${googleData.name || 'N/A'}
- Address: ${googleData.formatted_address || 'N/A'}
- Website: ${googleData.website || 'N/A'}
- Business Hours: ${googleData.business_hours ? googleData.business_hours.join(', ') : 'N/A'}
- Business Types: ${googleData.types ? googleData.types.join(', ') : 'N/A'}
${googleData.editorial_summary ? `- Summary: ${googleData.editorial_summary}` : ''}
============================================================
`
	}

	const prompt = `
You are a structured data extraction assistant.
Extract the following fields from the provided business website content.

${googleContext}

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
1. If Google Business Profile data is provided above, prioritize that information
2. If business hours are clearly mentioned, extract them as they are
3. Do not invent hours. If not found, leave business_hours as null
4. Extract services from both the website content and Google types if available
5. Return ONLY a valid JSON object, no markdown or text

Website Content:
${truncatedContent}
`

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.3,
		})

		const raw = response.choices?.[0]?.message?.content?.trim()
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

		// Prioritize Google data for name
		parsed.name = inferBusinessName(parsed, url, googleData)

		// Prioritize Google data for address
		const address = googleData?.formatted_address || parsed.address || null

		// Prioritize Google data for website
		const website = googleData?.website || url

		// Fallback description
		const description =
			parsed.description && parsed.description.trim().length > 0
				? parsed.description.trim()
				: generateDescription(parsed, truncatedContent, googleData)

		// Business hours: prioritize Google data, then AI extracted, then default
		let businessHours: BusinessHours[]
		if (googleData?.business_hours && Array.isArray(googleData.business_hours) && googleData.business_hours.length > 0) {
			businessHours = parseGoogleBusinessHours(googleData.business_hours)
		} else if (Array.isArray(parsed.business_hours) && parsed.business_hours.length > 0) {
			businessHours = parsed.business_hours
		} else {
			businessHours = getDefaultBusinessHours()
		}

		// Merge services from both sources
		let services: string[] | null = null
		const aiServices = Array.isArray(parsed.services) ? parsed.services : []
		const googleServices = googleData?.types?.filter((t) => t !== 'establishment' && t !== 'point_of_interest') || []

		const allServices = [...new Set([...aiServices, ...googleServices])]
		if (allServices.length > 0) {
			services = allServices
		}

		return {
			name: parsed.name,
			description,
			address,
			email: parsed.email ?? null,
			services,
			business_hours: businessHours,
			website,
		} as BusinessData
	} catch (err: any) {
		console.error('❌ AI Extraction Error:', err.message)
		return {
			error: 'Failed to extract business data',
			details: err.message || 'Unknown error occurred',
		}
	}
}
