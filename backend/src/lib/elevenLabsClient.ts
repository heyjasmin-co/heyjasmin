import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'
import config from '../config'

export const elevenlabsClient = new ElevenLabsClient({
	apiKey: config.ELEVENLABS_API_KEY,
})
