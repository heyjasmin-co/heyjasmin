import { LocalInstance } from 'twilio/lib/rest/api/v2010/account/availablePhoneNumberCountry/local'
import { twilioClient } from '../lib/twillio'
import { IncomingPhoneNumberInstance } from 'twilio/lib/rest/api/v2010/account/incomingPhoneNumber'

/**
 * Fetches available Twilio numbers and purchases one at random.
 */
export async function getTwilioAvailableNumbers():Promise<IncomingPhoneNumberInstance> {
	try {
		// Step 1: Fetch available numbers
		const availableNumbers = await twilioClient.availablePhoneNumbers('US').local.list({
			smsEnabled: true,
			voiceEnabled: true,
			limit: 20,
		})

		// Step 2: Pick a random number
		const pickedNumber = pickRandomNumber(availableNumbers)

		// Step 3: Purchase the number
		const purchasedNumber = await purchaseTwilioAvailableNumber(pickedNumber)

		return purchasedNumber
	} catch (error: any) {
		console.error('✗ Error in getTwilioAvailableNumbers:', error?.response?.data || error?.message || error)
		throw error
	}
}

/**
 * Purchases a Twilio number.
 */
async function purchaseTwilioAvailableNumber(pickNumber: LocalInstance) {
	try {
		const purchased = await twilioClient.incomingPhoneNumbers.create({
			phoneNumber: pickNumber.phoneNumber,
		})
		return purchased
	} catch (error: any) {
		console.error('✗ Error purchasing number:', error?.response?.data || error?.message || error)
		throw error
	}
}

/**
 * Randomly picks one number from the available list.
 */
export const pickRandomNumber = (availableNumbers: LocalInstance[]) => {
	if (!availableNumbers?.length) {
		throw new Error('No available numbers to pick from')
	}

	const randomIndex = Math.floor(Math.random() * availableNumbers.length)
	return availableNumbers[randomIndex]
}

/**
 * Releases/deletes a purchased Twilio number
 */
export async function releaseTwilioNumber(numberSid: string) {
	try {
		return await twilioClient.incomingPhoneNumbers(numberSid).remove()
	} catch (error: any) {
		console.error('✗ Error releasing Twilio number:', error?.response?.data || error?.message || error)
		throw error
	}
}
