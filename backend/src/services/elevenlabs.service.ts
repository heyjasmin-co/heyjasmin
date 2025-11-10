import 'dotenv/config'
import { elevenlabsClient } from '../lib/elevenLabsClient'

/**
 * Create Audio from text from an Elevenlabs Assistant
 */
export async function createElevenlabsAudioClip(text: string): Promise<string> {
	const audio = await elevenlabsClient.textToSpeech.convert('21m00Tcm4TlvDq8ikWAM', {
		text: text,
		modelId: 'eleven_multilingual_v2',
		outputFormat: 'mp3_44100_128',
	})

	// Convert ReadableStream to buffer
	const reader = audio.getReader()
	const chunks: Uint8Array[] = []

	while (true) {
		const { done, value } = await reader.read()
		if (done) break
		chunks.push(value)
	}

	const audioBuffer = Buffer.concat(chunks)

	// Convert to base64 data URL
	const base64Audio = audioBuffer.toString('base64')
	return `data:audio/mpeg;base64,${base64Audio}`
}
