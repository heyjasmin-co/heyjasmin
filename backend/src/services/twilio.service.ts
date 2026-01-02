import axios from 'axios'
import { LocalInstance } from 'twilio/lib/rest/api/v2010/account/availablePhoneNumberCountry/local'
import { IncomingPhoneNumberInstance } from 'twilio/lib/rest/api/v2010/account/incomingPhoneNumber'
import config from '../config'
import { twilioClient } from '../lib/twillio'

export async function getCountryCodeFromAddress(address: string): Promise<string> {
	if (!address) return 'US'

	const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
		params: {
			address,
			key: config.GOOGLE_MAP_API,
		},
	})

	const results = response.data.results
	if (!results?.length) return 'US'

	const countryComponent = results[0].address_components.find((c: any) => c.types.includes('country'))

	return countryComponent?.short_name || 'US'
}
/**
 * Fetches available Twilio numbers and purchases one at random.
 */
export async function getTwilioAvailableNumbers(address: string): Promise<IncomingPhoneNumberInstance> {
	try {
		const countryCode = await getCountryCodeFromAddress(address)
		// Step 1: Fetch available numbers
		const availableNumbers = await twilioClient.availablePhoneNumbers(countryCode).local.list({
			smsEnabled: true,
			voiceEnabled: true,
			limit: 10,
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
