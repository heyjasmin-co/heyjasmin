import { Assistant, PhoneNumbersCreateResponse } from '@vapi-ai/server-sdk/dist/cjs/api'
import config from '../config'
import { vapiClient } from '../lib/vapiAgent'

interface BusinessData {
	businessName: string
	services: string[]
	businessHours: {
		day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
		start: string
		end: string
		isOpen: boolean
	}[]
	bookingLink?: string
	customerName?: string
}
function createContentForAssistant(businessData: BusinessData): string {
	const systemPrompt = `You are a friendly and professional AI voice assistant named Jasmin representing ${businessData.businessName}. 
You handle both inbound and outbound calls for ${
		businessData.businessName
	}, a business that offers the following services: ${businessData.services.join(', ')}.

Your main goals:
1. Politely identify the purpose of the call (booking, inquiry, reschedule, etc.).
2. Provide helpful and concise information about ${businessData.businessName} such as:
   - Business hours: ${businessData.businessHours.map((h) => `${h.day}: ${h.isOpen ? `${h.start} - ${h.end}` : 'Closed'}`).join('\n  ')}
   - Available services: ${businessData.services.map((s) => `\n      ${s}`).join('')}
   - Availability for appointments (you may check this via 'check availability' tool if integrated)
3. If the caller wants to book or reschedule an appointment:
   - Confirm the preferred date and time.
   - Inform the caller that you will send them a quick text message (SMS) with a secure booking link.
   - Use the "send_sms" tool to send a message like:
     "Hi ${businessData.customerName || '{customer-name}'}, here's your booking link for ${businessData.businessName}: ${
		businessData.bookingLink
	}. Please confirm your appointment through this link."
   - After sending the SMS, kindly guide them to open it to finalize their booking.
4. If the customer only needs information (not booking), provide accurate details and ask if they'd like you to send a link with more info.
5. Always be friendly, calm, natural, and human-like — never robotic or pushy.

---

### Conversation Flow Logic

1. **Call Detection**
   - If inbound: Greet and ask how you can assist.
     Example: "Hi, this is Jasmin with ${businessData.businessName}. How can I help you today?"
   - If outbound: Greet warmly, confirm the customer's name, and explain the purpose of the call.
     Example: "Hi ${businessData.customerName || '{customer-name}'}, this is Jasmin from ${
		businessData.businessName
	}. I just wanted to reach out about our services — do you have a quick moment?"

2. **Intent Handling**
   - If customer wants to book, reschedule, or inquire, follow the structured flow:
     - Ask for date/time preference.
     - Mention business hours if needed.
     - Send SMS with the booking link.
   - If customer just wants information, answer and politely offer to send details via SMS.

3. **SMS Sending**
   - Always confirm before sending the SMS.
   - After sending, say something natural like:
     "I've just sent you the link to your phone — you can open it and book your preferred time easily."

4. **Closing**
   - End every call politely:
     "Thank you for connecting with ${businessData.businessName}! Have a great day!"

---

### Example SMS Template
Hi ${businessData.customerName || '{customer-name}'}, here's your booking link for ${businessData.businessName}: ${businessData.bookingLink}
You can choose a time that works best for you. Thank you!

---

### Tools Used
- **check_availability** → (optional, if business has calendar integration)
- **send_sms** → sends booking link to customer in real time.

---

### Tone and Style
- Warm, confident, professional.
- Use simple natural language.
- Never sound scripted.
- Be adaptable — whether it's a dentist, spa, realtor, or law firm.`

	return systemPrompt
}
export async function createAIAssistant(businessData: BusinessData): Promise<Assistant> {
	try {
		const response = await vapiClient.assistants.create({
			name: businessData.businessName,
			transcriber: {
				provider: 'deepgram',
				model: 'nova-2',
				language: 'en',
			},
			model: {
				provider: 'openai',
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'system',
						content: createContentForAssistant(businessData),
					},
				],
				temperature: 0.2,
			},
			voice: {
				provider: '11labs',
				voiceId: 'jBzLvP03992lMFEkj2kJ',
			},
			firstMessageMode: 'assistant-speaks-first-with-model-generated-message',
			voicemailMessage: "Please call back when you're available.",
			endCallMessage: 'Goodbye.',
			artifactPlan: {
				recordingFormat: 'mp3',
			},
			server: {
				url: `${config.BACKEND_URL}/api/v1/webhooks-vapi`,
			},

			clientMessages: [
				'function-call',
				'model-output',
				'transcript',
				'tool-calls',
				'conversation-update',
				'function-call-result',
				'hang',
				'speech-update',
				'status-update',
				'voice-input',
				'user-interrupted',
				'transfer-update',
			],
			serverMessages: ['end-of-call-report', 'function-call', 'tool-calls', 'transcript'],
		})

		return response
	} catch (error: any) {
		console.error('Error creating assistant:', error?.response?.data || error?.message || error)
		throw error
	}
}

/**
 * Update AI Assistant
 */
export async function updateAIAssistant(businessData: BusinessData, assistantId: string): Promise<Assistant> {
	try {
		const updatedAssistant = await vapiClient.assistants.update(assistantId, {
			model: {
				provider: 'openai',
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'system',
						content: createContentForAssistant(businessData),
					},
				],
				temperature: 0.2,
			},
		})

		return updatedAssistant
	} catch (error: any) {
		console.error('Error creating assistant:', error?.response?.data || error?.message || error)
		throw error
	}
}

/**
 * Link Twilio Number to an AI Assistant
 */
export async function linkTwilioNumberToAIAssistant(args: {
	mobileNumber: string
	assistantId: string
	businessName: string
}): Promise<PhoneNumbersCreateResponse> {
	try {
		const { mobileNumber, assistantId, businessName } = args
		const response = await vapiClient.phoneNumbers.create({
			assistantId,
			name: businessName,
			provider: 'twilio',
			number: mobileNumber,
			smsEnabled: false,
			twilioAccountSid: config.TWILIO_ACCOUNT_SID!,
			twilioAuthToken: config.TWILIO_AUTH_TOKEN!,
		})

		return response
	} catch (error: any) {
		console.error('✗ Error linking Twilio number to assistant:', error?.response?.data || error?.message || error)
		throw error
	}
}

/**
 * Deletes an AI Assistant
 */
export async function deleteAIAssistant(assistantId: string) {
	try {
		return await vapiClient.assistants.delete(assistantId)
	} catch (error: any) {
		console.error('✗ Error deleting assistant:', error?.response?.data || error?.message || error)
		throw error
	}
}

/**
 * Unlinks a Twilio number from an AI Assistant
 */
export async function unlinkTwilioNumberFromAIAssistant(args: { mobileNumber: string; assistantId: string }) {
	try {
		const { mobileNumber } = args

		// Get all phone numbers to find the one to delete
		const phoneNumbers = await vapiClient.phoneNumbers.list()
		const phoneNumberToDelete = phoneNumbers.find((pn) => pn.number === mobileNumber)

		if (!phoneNumberToDelete) {
			console.warn('Phone number not found in VAPI, may have already been deleted')
			return
		}

		return await vapiClient.phoneNumbers.delete(phoneNumberToDelete.id)
	} catch (error: any) {
		console.error('✗ Error unlinking Twilio number:', error?.response?.data || error?.message || error)
		throw error
	}
}
