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

//
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

//
interface CreateCallTransferToolData {
	businessName: string
	transferTo: string
	warmTransfer: boolean
}

interface CallTransferFunctionCall {
	id: string
	createdAt: string
	updatedAt: string
	type: 'transferCall'
	function: {
		name: string
	}
	messages: VapiTransferMessage[]
	orgId: string
	destinations: VapiTransferDestination[]
}

export interface VapiTransferMessage {
	type: 'request-start'
	content: string
	blocking: boolean
}

export interface VapiTransferDestination {
	type: 'number'
	number: string
	message: string
	description?: string
	numberE164CheckEnabled: boolean
	transferPlan?: VapiTransferPlan
}

export interface VapiTransferPlan {
	mode: 'warm-transfer-say-summary' | 'blind-transfer'
	sipVerb: 'refer'
	summaryPlan?: {
		enabled: boolean
		messages: {
			role: 'system' | 'user'
			content: string
		}[]
		timeoutSeconds: number
		useAssistantLlm: boolean
	}
}

//
interface UpdateCallTransferToolData {
	businessName: string
	transferTo: string
	warmTransfer: boolean
	assistantCallTransferToolId: string
}

/**
 * Get Sanitized Name
 */
const getSanitizedName = (name: string) => {
	return name
		.replace(/[^a-zA-Z0-9_-]/g, '_') // Replace invalid chars with underscore
		.replace(/_{2,}/g, '_') // Replace multiple underscores with single
		.replace(/^[_-]+|[_-]+$/g, '') // Remove leading/trailing underscores or hyphens
		.substring(0, 54) // Leave room for "send_sms_" prefix (64 - 9 = 55, but safer with 54)
}

// /**
//  * Create Content For Assistant
//  */
// function createContentForAssistant(businessData: BusinessData): string {
// 	const sanitizedName = getSanitizedName(businessData.businessName)

// 	const toolName = `send_sms_${sanitizedName}`
// 	const systemPrompt = `You are a friendly and professional AI voice assistant named Jasmin representing ${businessData.businessName}.
// You handle both inbound and outbound calls for ${
// 		businessData.businessName
// 	}, a business that offers the following services: ${businessData.services.join(', ')}.

// Your main goals:
// 1. Politely identify the purpose of the call (booking, inquiry, reschedule, etc.).
// 2. Provide helpful and concise information about ${businessData.businessName} such as:
//    - Business hours: ${businessData.businessHours.map((h) => `${h.day}: ${h.isOpen ? `${h.start} - ${h.end}` : 'Closed'}`).join('\n  ')}
//    - Available services: ${businessData.services.map((s) => `\n      ${s}`).join('')}
// 3. If the caller wants to book or reschedule an appointment:
//    - Inform the caller that you will send them a quick text message (SMS) with a secure booking link.
//    - Use the "${toolName}" tool to send a message like:
//      "Hi ${businessData.customerName || '{customer-name}'}, here's your booking link for ${businessData.businessName}: ${
// 			businessData.bookingLink
// 		}. Please confirm your appointment through this link."
//    - After sending the SMS, kindly guide them to open it to finalize their booking.
// 4. If the customer only needs information (not booking), provide accurate details and ask if they'd like you to send a link with more info.
// 5. Always be friendly, calm, natural, and human-like — never robotic or pushy.

// ---

// ### Conversation Flow Logic

// 1. **Call Detection**
//    - If inbound: Greet and ask how you can assist.
//      Example: "Hi, this is Jasmin with ${businessData.businessName}. How can I help you today?"
//    - If outbound: Greet warmly, confirm the customer's name, and explain the purpose of the call.
//      Example: "Hi ${businessData.customerName || '{customer-name}'}, this is Jasmin from ${
// 			businessData.businessName
// 		}. I just wanted to reach out about our services — do you have a quick moment?"

// 2. **Intent Handling**
//    - If customer wants to book, reschedule, or inquire, follow the structured flow:
//      - Ask for date/time preference.
//      - Mention business hours if needed.
//      - Send SMS with the booking link.
//    - If customer just wants information, answer and politely offer to send details via SMS.

// 3. **SMS Sending**
//    - Always confirm before sending the SMS.
//    - After sending, say something natural like:
//      "I've just sent you the link to your phone — you can open it and book your preferred time easily."

// 4. **Closing**
//    - End every call politely:
//      "Thank you for connecting with ${businessData.businessName}! Have a great day!"

// ---

// ### Example SMS Template
// Hi ${businessData.customerName || '{customer-name}'}, here's your booking link for ${businessData.businessName}: ${businessData.bookingLink}
// You can choose a time that works best for you. Thank you!

// ---

// ### Tools Used
// - **${toolName}** → sends booking link to customer in real time.

// ---

// ### Tone and Style
// - Warm, confident, professional.
// - Use simple natural language.
// - Never sound scripted.
// - Be adaptable — whether it's a dentist, spa, realtor, or law firm.`

// 	return systemPrompt
// }
/**
 * Create Content For Assistant
 */
function createContentForAssistant(businessData: BusinessData): string {
	const sanitizedName = getSanitizedName(businessData.businessName)

	const sendSmsToolName = `send_sms_${sanitizedName}`
	const transferToolName = `transfer_call_${sanitizedName}`
	const systemPrompt = `You are a friendly and professional AI voice assistant named *Jasmin, representing **Machine Minds*.

You handle *inbound calls only*.

Machine Minds offers:
- Voice agent development  
- Chatbot development  

---

## Current Date and Time

The current date and time is {{now}}.

---

## System Variables (Provided Dynamically)

- transferAvailability = "always" | "business_hours" | "custom" | "none"  
- currentPlan = "Essential" | "Pro" | "Plus" | "Custom"  

---

## Rules for Call Transfer Availability

- If transferAvailability = "none" → Transfer is never allowed  
- If transferAvailability = "always" → Transfer always allowed  
- If transferAvailability = "business_hours" → Only during business hours  
- If transferAvailability = "custom" → Only within defined time range  

If transfer is requested outside allowed time, say:

"Our team is currently unavailable, but I’d be happy to assist you or arrange something for later."

---

## Rules for Plan Restrictions

### If currentPlan = "Essential"

The following are NOT allowed:
- Booking appointments  
- Sending SMS  
- Call transfer  

If user requests *booking, **SMS, or **transfer*, say ONLY:

"This service is not available at this time."  
"If you want further information, I am here to assist you."

Do NOT:
- Ask for name  
- Ask for date/time  
- Continue booking flow  
- Mention plans  
- Offer alternatives  

---

### If currentPlan = "Pro" or "Plus" or "Custom"

Allowed:
- Booking  
- SMS  
- Call transfer (based on availability rules)  

---

## Main Goals

1. Identify the reason for the call (booking, reschedule, inquiry, complaint, etc.)  
2. Provide clear information:
   - Business hours: 24/7  
   - Services: Voice agent development, chatbot development  
3. Help with booking/rescheduling (ONLY if allowed)  
4. Transfer calls when allowed  
5. Maintain a warm, natural, human tone  

---

## Call Opening (Inbound Only)

Start every call exactly like this:

"Thank you for calling Machine Minds. I’m Jasmin from Machine Minds. This call may be recorded for quality and training purposes. How can I help you today?"

---

## Booking & Rescheduling Flow

FIRST check currentPlan

---

### If Essential Plan

Say:

"This service is not available at this time."  
"If you want further information, I am here to assist you."

STOP.

---

### If Pro / Plus / Custom Plan

1. Ask for name  
2. Ask for preferred date and time  
3. Mention availability if needed (24/7)  

Then say:

"I can send you a secure booking link via text message. Would you like me to send that now?"

If yes:
- Use tool: send_sms_MachineMinds

SMS:
Hi {customer-name}, here is your booking link for scheduling your preferred date and time:
https://machineminds.agency
You can choose a time that works best for you.

After sending:
"I've just sent it to your phone. You should receive it shortly."

---

## Information Requests

- Provide concise answers  
- Offer SMS only if allowed  

---

## Call Transfer Logic

Before transferring, check:
- currentPlan  
- transferAvailability  
- Time condition  

---

### If Essential Plan

Say:

"This service is not available at this time."  
"If you want further information, I am here to assist you."

---

### If Transfer Not Allowed (Time Restriction)

"Our team is currently unavailable, but I’d be happy to assist you or arrange something for later."

---

### If Transfer Allowed

Say:

"Of course, I’ll connect you to one of our team members right away. Please hold for just a moment."

Then use:
transfer_call_MachineMinds

---

## Never Say

- "I cannot help with that."  
- "That’s not my responsibility."  
- "This is not available on your plan."  

---

## Closing

If resolved:

"Thank you for calling Machine Minds. We truly appreciate it — have a wonderful day!"

If transferring:

"Please hold while I connect you."

---

## Tools

- send_sms_MachineMinds  
- transfer_call_MachineMinds  

---

## Tone Guidelines

- Short sentences  
- Natural and conversational  
- Friendly and professional  
- No filler words  
- Smooth and confident tone`

	return systemPrompt
}

/**
 * Create AI Assistant Data
 */
function createAssistantData(businessData: BusinessData): any {
	const assistantData = {
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
			timeoutSeconds: 20,
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
	}

	return assistantData
}

export async function createAIAssistant(businessData: BusinessData): Promise<Assistant> {
	try {
		const response = await vapiClient.assistants.create(createAssistantData(businessData))

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
		const currentAssistant = await vapiClient.assistants.get(assistantId)
		if (!currentAssistant.model) {
			throw new Error('Assistant has no model configuration')
		}

		const updatedAssistant = await vapiClient.assistants.update(assistantId, {
			model: {
				...currentAssistant.model,
				messages: [
					{
						role: 'system',
						content: createContentForAssistant(businessData),
					},
				],
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
		const sanitizedName = getSanitizedName(businessData.businessName)

		const toolName = `send_sms_${sanitizedName}`
		const payload = {
			type: 'sms',
			function: {
				name: toolName,
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
 * Creates a Call Transfer tool for the AI assistant
 */
export async function createCallTransferTool(businessData: CreateCallTransferToolData): Promise<CallTransferFunctionCall> {
	try {
		const { businessName, transferTo, warmTransfer } = businessData
		const payload = getCallTransferTool(businessName, transferTo, warmTransfer)

		const response = await axios.post('https://api.vapi.ai/tool/', payload, {
			headers: {
				Authorization: `Bearer ${config.VAPI_API_KEY}`,
				'Content-Type': 'application/json',
			},
		})
		return response.data
	} catch (error: any) {
		console.error('Failed to create VAPI Transfer tool:', error.response?.data || error.message)
		throw error
	}
}
/**
 * Update a Call Transfer tool for the AI assistant
 */
export async function updateCallTransferTool(businessData: UpdateCallTransferToolData): Promise<CallTransferFunctionCall> {
	try {
		const { businessName, transferTo, warmTransfer, assistantCallTransferToolId } = businessData
		const payload = getCallTransferTool(businessName, transferTo, warmTransfer)
		const { type, ...updatePayload } = payload

		const response = await axios.patch(`https://api.vapi.ai/tool/${assistantCallTransferToolId}`, updatePayload, {
			headers: {
				Authorization: `Bearer ${config.VAPI_API_KEY}`,
				'Content-Type': 'application/json',
			},
		})
		return response.data
	} catch (error: any) {
		console.error('Failed to update VAPI Transfer tool:', error.response?.data || error.message)
		throw error
	}
}

/**
 * Get Call Transfer tool for the AI assistant
 */
const getCallTransferTool = (businessName: string, transferTo: string, warmTransfer: boolean) => {
	const sanitizedName = getSanitizedName(businessName)
	const toolName = `transfer_call_${sanitizedName}`
	const sanitizedNumber = transferTo.trim().replace(/[^\d+]/g, '')
	const formattedNumber = sanitizedNumber.startsWith('+') ? sanitizedNumber : `+${sanitizedNumber}`
	const payload = {
		type: 'transferCall',
		function: {
			name: toolName,
			parameters: null,
		},
		messages: [
			{
				type: 'request-start',
				content: 'Your call is being transferred; please wait.',
				blocking: false,
			},
		],
		destinations: [
			{
				type: 'number',
				number: formattedNumber,
				message: 'Your call is being transferred.',
				description:
					'Use the Destination Request when the assistant needs to call a third party for the user, briefly explain the purpose of the call, and then connect both sides. Do not use it if no real phone connection or destination number is provided.',

				...(warmTransfer && {
					transferPlan: {
						mode: 'warm-transfer-say-summary',
						sipVerb: 'refer',
						summaryPlan: {
							enabled: true,
							messages: [
								{
									role: 'system',
									content:
										'You are an AI call assistant. Generate a concise and neutral summary of the phone conversation in 1–3 short sentences explaining only the purpose of the call.',
								},
								{
									role: 'user',
									content: 'Generate a brief call summary based on the following transcript:\n\n{{transcript}}',
								},
							],
							timeoutSeconds: 5,
							useAssistantLlm: true,
						},
					},
				}),

				numberE164CheckEnabled: true,
			},
		],
	}
	return payload
}

/**
 * Updates the AI assistant by attaching a tool (SMS, Call Transfer, etc.)
 */
export async function attachToolToAssistant({ assistantId, toolId }: { assistantId: string; toolId: string }) {
	try {
		const currentAssistant = await vapiClient.assistants.get(assistantId)

		if (!currentAssistant.model) {
			throw new Error('Assistant has no model configuration')
		}

		const existingToolIds: string[] = currentAssistant.model.toolIds || []

		if (existingToolIds.includes(toolId)) {
			return currentAssistant
		}

		const updatedAssistant = await vapiClient.assistants.update(assistantId, {
			model: {
				...currentAssistant.model,
				toolIds: [...existingToolIds, toolId],
			},
		})

		return updatedAssistant
	} catch (error: any) {
		console.error('Failed to attach tool to assistant:', error.response?.data || error.message)
		throw error
	}
}

/**
 * Deletes the Send SMS tool for the AI assistant
 */
export async function deleteSendSMSTool(assistantSmsToolId: string) {
	try {
		await vapiClient.tools.delete(assistantSmsToolId)
	} catch (error: any) {
		console.error('Failed to delete VAPI SMS tool:', error.response?.data || error.message)
		throw error
	}
}
/**
 * Deletes the Call Transfer tool for the AI assistant
 */
export async function deleteCallTransferTool(assistantCallTransferToolId: string) {
	try {
		await vapiClient.tools.delete(assistantCallTransferToolId)
	} catch (error: any) {
		console.error('Failed to delete VAPI Call Transfer tool:', error.response?.data || error.message)
		throw error
	}
}
/**
 * Deletes a phone number from VAPI
 */
export async function deleteVapiPhoneNumber(phoneNumberId: string) {
	try {
		await vapiClient.phoneNumbers.delete(phoneNumberId)
	} catch (error: any) {
		console.error('Failed to delete VAPI phone number:', error.response?.data || error.message)
		throw error
	}
}
