import OpenAI from 'openai'
import config from '../config'

/**
 * Singleton OpenAI client using OpenRouter base URL
 */
export const openai = new OpenAI({
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: config.apiKey,
})

export interface BusinessData {
	name: string | null
	description: string | null
	address: string | null
	email: string | null
	services: string[] | null
	business_hours: string[] | null
	website: string
}

export async function extractBusinessData(url: string): Promise<BusinessData | { error: string }> {
	if (!url || !/^https?:\/\//.test(url)) {
		return { error: 'Invalid URL provided.' }
	}

	const prompt = `
You are a structured data extraction assistant.
Visit or imagine reading the content of the following website and extract structured information.

Fields:
- name
- description
- address
- email
- services (array)
- business_hours (array)
- website (must match input URL)

If something is not found, set it explicitly to null.

Return a single, valid JSON object only — no text, no explanation.

Website URL: ${url}
`

	try {
		const response = await openai.chat.completions.create({
			model: 'alibaba/tongyi-deepresearch-30b-a3b:free',
			messages: [{ role: 'user', content: prompt }],
		})

		const raw = response.choices?.[0]?.message?.content?.trim()
		if (!raw) {
			return { error: 'Empty response from OpenAI.' }
		}

		try {
			const parsed = JSON.parse(raw)
			return {
				name: parsed.name ?? null,
				description: parsed.description ?? null,
				address: parsed.address ?? null,
				email: parsed.email ?? null,
				services: parsed.services ?? null,
				business_hours: parsed.business_hours ?? null,
				website: url,
			}
		} catch (jsonErr) {
			console.warn('⚠️ OpenAI returned non-JSON content:', raw)
			return { error: 'Invalid JSON returned from model.' }
		}
	} catch (err: any) {
		console.error('❌ OpenAI API Error:', err.message)
		return { error: 'Failed to extract business data from AI.' }
	}
}
