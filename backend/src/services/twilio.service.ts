import axios from 'axios'
import { LocalInstance } from 'twilio/lib/rest/api/v2010/account/availablePhoneNumberCountry/local'
import { IncomingPhoneNumberInstance } from 'twilio/lib/rest/api/v2010/account/incomingPhoneNumber'
import config from '../config'
import { twilioClient } from '../lib/twillio'

interface AddressDetails {
	countryCode: string
	state?: string
	city?: string
	latitude?: number
	longitude?: number
}

/**
 * Extracts country, state, city, and coordinates from address
 */
export async function getAddressDetails(address: string): Promise<AddressDetails> {
	if (!address) {
		return { countryCode: 'US' }
	}

	try {
		const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
			params: {
				address,
				key: config.GOOGLE_MAP_API,
			},
		})

		const results = response.data.results
		if (!results?.length) {
			return { countryCode: 'US' }
		}

		const addressComponents = results[0].address_components
		const geometry = results[0].geometry?.location

		// Extract country
		const countryComponent = addressComponents.find((c: any) => c.types.includes('country'))
		const countryCode = countryComponent?.short_name || 'US'

		// Extract state/province
		const stateComponent = addressComponents.find((c: any) => 
			c.types.includes('administrative_area_level_1')
		)
		const state = stateComponent?.short_name // e.g., "PA", "CA", "ON"

		// Extract city
		const cityComponent = addressComponents.find((c: any) => 
			c.types.includes('locality') || c.types.includes('administrative_area_level_2')
		)
		const city = cityComponent?.long_name

		return {
			countryCode,
			state,
			city,
			latitude: geometry?.lat,
			longitude: geometry?.lng,
		}
	} catch (error: any) {
		console.error('✗ Error in getAddressDetails:', error?.message || error)
		return { countryCode: 'US' }
	}
}

/**
 * Fetches available Twilio numbers close to the business address and purchases one.
 */
export async function getTwilioAvailableNumbers(address: string): Promise<IncomingPhoneNumberInstance> {
	try {
		// Step 1: Get detailed address information
		const addressDetails = await getAddressDetails(address)
		
		const LOCAL_SUPPORTED_COUNTRIES = ['US', 'CA', 'GB', 'AU']
		const effectiveCountryCode = LOCAL_SUPPORTED_COUNTRIES.includes(addressDetails.countryCode) 
			? addressDetails.countryCode 
			: 'US'
 
		// Step 2: Build search parameters for local numbers
		let searchParams: any = {
			smsEnabled: true,
			voiceEnabled: true,
			limit: 10,
		}

		// For US and CA, we can search by area or coordinates
		if (effectiveCountryCode === 'US' || effectiveCountryCode === 'CA') {
			
			// Priority 1: Search by coordinates (most accurate)
			if (addressDetails.latitude && addressDetails.longitude) {
				searchParams.nearLatLong = `${addressDetails.latitude},${addressDetails.longitude}`
				searchParams.distance = 50 // Search within 50 miles/km
			}
			// Priority 2: Search by state/region
			else if (addressDetails.state) {
				searchParams.inRegion = addressDetails.state // e.g., "PA", "CA", "ON"
			}
		}

		// Step 3: Try to fetch available numbers with location preference
		let availableNumbers = await twilioClient
			.availablePhoneNumbers(effectiveCountryCode)
			.local.list(searchParams)

		// Step 4: Fallback - if no numbers found near location, expand search
		if (!availableNumbers.length && searchParams.nearLatLong) {
			console.log('⚠️ No numbers found within 50 miles, expanding search to 100 miles...')
			searchParams.distance = 100
			availableNumbers = await twilioClient
				.availablePhoneNumbers(effectiveCountryCode)
				.local.list(searchParams)
		}

		// Step 5: Fallback - remove location filters if still no numbers
		if (!availableNumbers.length && (searchParams.nearLatLong || searchParams.inRegion)) {
			console.log('⚠️ No regional numbers found, searching anywhere in', effectiveCountryCode)
			availableNumbers = await twilioClient
				.availablePhoneNumbers(effectiveCountryCode)
				.local.list({
					smsEnabled: true,
					voiceEnabled: true,
					limit: 10,
				})
		}

		// Step 6: Check if we found any numbers
		if (!availableNumbers.length) {
			throw new Error(`No available phone numbers found in ${effectiveCountryCode}`)
		}

		console.log(`✓ Found ${availableNumbers.length} available numbers`)

		// Step 7: Pick a random number from available options
		const pickedNumber = pickRandomNumber(availableNumbers)
		
		console.log('✓ Selected number:', pickedNumber.phoneNumber)

		// Step 8: Purchase the number
		const purchasedNumber = await purchaseTwilioAvailableNumber(pickedNumber)

		console.log('✓ Successfully purchased number:', purchasedNumber.phoneNumber)

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
