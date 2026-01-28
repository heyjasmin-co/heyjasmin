import { Assistant, PhoneNumbersCreateResponse } from '@vapi-ai/server-sdk/dist/cjs/api'
import axios from 'axios'
import Decimal from 'decimal.js'
import { FastifyRequest } from 'fastify'
import config from '../config'
import { vapiClient } from '../lib/vapiAgent'
import { Business, Call } from '../models'
import { BusinessPlan } from '../models/BusinessPlan'
import { Trial } from '../models/Trial'
import { runTransaction } from '../utils/transaction'
import { checkBusinessSubscription } from './subscription.service'
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
interface SmsFunctionCall {
	id: string
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
	type: 'sms'

	function: {
		name: string
		description: string
		parameters: {
			type: 'object'
			properties: Record<string, unknown>
			required: string[]
		}
	}

	messages: Array<{
		type: string
		blocking: boolean
	}>

	metadata: {
		from: string
	}

	orgId: string
}

interface SendSMSToolData {
	businessName: string
	twilioPhoneNumber: string
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
3. If the caller wants to book or reschedule an appointment:
   - Inform the caller that you will send them a quick text message (SMS) with a secure booking link.
   - Use the "send_sms_${businessData.businessName.toLowerCase().replace(/\s+/g, '_')}" tool to send a message like:
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
- **send_sms_${businessData.businessName.toLowerCase().replace(/\s+/g, '_')}** → sends booking link to customer in real time.

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
				model: 'eleven_turbo_v2_5',
				voiceId: 'jBzLvP03992lMFEkj2kJ',
				provider: '11labs',
				stability: 0.5,
				similarityBoost: 0.75,
			},
			firstMessageMode: 'assistant-speaks-first-with-model-generated-message',
			voicemailMessage: "Please call back when you're available.",
			backgroundSound: 'off',
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
			serverMessages: ['end-of-call-report'],
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
 * Get phone number linked to a specific AI Assistant
 */
export async function getAssistantPhoneNumber(assistantId: string): Promise<string | null> {
	try {
		// Fetch all phone numbers
		const phoneNumbers = await vapiClient.phoneNumbers.list()

		// Find the number linked to this assistant
		const linkedNumber = phoneNumbers.find((pn) => pn.assistantId === assistantId)

		if (!linkedNumber) {
			console.warn(`No phone number linked to assistant ID: ${assistantId}`)
			return null
		}

		return linkedNumber.number ?? null // return the phone number as string
	} catch (error: any) {
		console.error('✗ Error fetching assistant phone number:', error?.response?.data || error?.message || error)
		throw error
	}
}
/**
 * Unlinks a Twilio number from an AI Assistant
 */
export async function unlinkTwilioNumberFromAIAssistant(args: { mobileNumber: string; assistantId: string; businessName?: string }) {
	const { mobileNumber, assistantId, businessName } = args
	try {
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
		await linkTwilioNumberToAIAssistant({
			mobileNumber,
			assistantId,
			businessName: businessName!,
		})
		throw error
	}
}
/**
 * Unlinks assistant from phone number (keeps the phone number active)
 */
export async function unlinkAssistantFromPhoneNumber(assistantPhoneNumberId: string) {
	try {
		const phoneNumbers = await vapiClient.phoneNumbers.list()
		const phoneNumber = phoneNumbers.find((pn) => pn.id === assistantPhoneNumberId)

		if (!phoneNumber) {
			console.warn('Phone number not found in VAPI')
			return false
		}

		await vapiClient.phoneNumbers.update(phoneNumber.id, {
			assistantId: undefined,
		})

		console.log(`✓ Assistant unlinked from phone number ${phoneNumber.number}`)
	} catch (error: any) {
		console.error('✗ Error unlinking assistant:', error?.response?.data || error?.message || error)
		throw error
	}
}

/**
 * Create Call from an VAPI Assistant Webhook
 */

export async function handleCreateAssistantCall(request: FastifyRequest, vapiMessage: any) {
	try {
		let assistantId = vapiMessage?.assistant?.id
		const business = await Business.findOne({
			'aiAgentSettings.assistantId': assistantId,
		})

		if (!business) {
			request.log.error(`No business found for assistant ID: ${assistantId}`)
			return null
		}

		const durationMinutes = vapiMessage.durationMinutes
			? new Decimal(vapiMessage.durationMinutes).toDecimalPlaces(2, Decimal.ROUND_HALF_EVEN).toNumber()
			: 0
		const data = {
			businessId: business?._id,
			callId: vapiMessage?.call?.id,
			summary: vapiMessage?.analysis?.summary,
			recordingUrl: vapiMessage.recordingUrl,
			status: vapiMessage.analysis.successEvaluation ? 'completed' : 'missed',
			durationMs: vapiMessage.durationMs,
			durationSeconds: vapiMessage.durationSeconds,
			durationMinutes: durationMinutes,
			customerPhoneNumber: vapiMessage?.call?.customer?.number ?? null,
		}
		business.totalCallMinutes = new Decimal(business.totalCallMinutes ?? 0).plus(durationMinutes).toDecimalPlaces(2).toNumber()
		const businessSubscription = await checkBusinessSubscription((business._id as any).toString())

		return await runTransaction(async (session) => {
			if (
				businessSubscription.remainingMinutes !== 'unlimited' &&
				business.totalCallMinutes >= businessSubscription.remainingMinutes
			) {
				if (businessSubscription.isTrial) {
					await Trial.findOneAndUpdate(
						{ businessId: business._id },
						{
							$set: {
								trialEndDate: new Date(),
								trialStatus: 'trial_ended',
							},
						},
						{
							session,
							upsert: false,
						}
					)
				} else if (businessSubscription.isActive && businessSubscription.plan === 'essential') {
					await BusinessPlan.findOneAndUpdate(
						{ businessId: business._id },
						{
							$set: {
								subscriptionEndDate: new Date(),
								subscriptionStatus: 'inactive',
							},
						},
						{
							session,
							upsert: false,
						}
					)
				}

				// TODO: Disable Twilio number for this business
				await unlinkTwilioNumberFromAIAssistant({
					mobileNumber: business.aiAgentSettings.twilioNumber!,
					assistantId,
					businessName: business.name,
				})
				business.aiAgentSettings.assistantPhoneNumberId = null
			}
			const call = new Call(data)
			await call.save({ session })
			await business.save({ session })

			request.log.info(`✅ Call record created for business ${business._id}`)
			return call
		})
	} catch (error: any) {
		console.error('❌ Failed to create call:', error?.response?.data || error?.message || error)
		throw new Error('Failed to create call record')
	}
}

/**
 * Creates a Send SMS tool for the AI assistant
 */
export async function createSendSMSTool(businessData: SendSMSToolData): Promise<SmsFunctionCall> {
	try {
		const payload = {
			type: 'sms',
			function: {
				name: `send_sms_${businessData.businessName.toLowerCase().replace(/\s+/g, '_')}`,
				description: 'Send an SMS message to the customer with booking information, confirmations, or general details.',
				parameters: {
					type: 'object',
					properties: {},
					required: [],
				},
			},
			messages: [
				{
					type: 'request-start',
					blocking: false,
				},
			],
			metadata: {
				from: businessData.twilioPhoneNumber,
			},
		}

		const response = await axios.post('https://api.vapi.ai/tool/', payload, {
			headers: {
				Authorization: `Bearer ${config.VAPI_API_KEY}`,
				'Content-Type': 'application/json',
			},
		})

		return response.data
	} catch (error: any) {
		console.error('Failed to create VAPI SMS tool:', error.response?.data || error.message)
		throw error
	}
}

/**
 * Updates the AI assistant with the Send SMS tool
 */
export async function updateAIAssistantWithSendSMSTool({
	businessData,
	toolId,
	assistantId,
}: {
	businessData: BusinessData
	toolId: string
	assistantId: string
}) {
	try {
		const update = await vapiClient.assistants.update(assistantId, {
			model: {
				provider: 'openai',
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'system',
						content: createContentForAssistant(businessData),
					},
				],
				toolIds: [toolId],
				temperature: 0.2,
			},
		})

		return update
	} catch (error: any) {
		console.error('Failed to update VAPI SMS tool:', error.response?.data || error.message)
		throw error
	}
}

/**
 * Deletes the Send SMS tool for the AI assistant
 */
export async function deleteSendSMSTool(toolId: string) {
	try {
		await vapiClient.tools.delete(toolId)
	} catch (error: any) {
		console.error('Failed to delete VAPI SMS tool:', error.response?.data || error.message)
		throw error
	}
}
