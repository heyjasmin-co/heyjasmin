// Avoid importing SDK types directly to prevent type-resolution issues; use local 'any' types for external resources.
import { FastifyRequest } from 'fastify'
import { Business } from '../../../models'
import { getTwilioAvailableNumbers, releaseTwilioNumber } from '../../../services/twilio.service'
import {
	createAIAssistant,
	createSendSMSTool,
	deleteAIAssistant,
	deleteSendSMSTool,
	linkTwilioNumberToAIAssistant,
	unlinkTwilioNumberFromAIAssistant,
	updateAIAssistantWithSendSMSTool,
} from '../../../services/vapi.service'
import { runTransaction } from '../../../utils/transaction'
import { UpdateBusinessDetailsByIdInput, UpdateBusinessDetailsByIdOutput } from './types'

export const updateBusinessDetailsById = async (
	request: FastifyRequest,
	args: UpdateBusinessDetailsByIdInput
): Promise<UpdateBusinessDetailsByIdOutput> => {
	const { businessId, ...updateData } = args

	let aIAssistant: any | null = null
	let twilioNumber: any | null = null
	let linkedPhoneNumber: any | null = null
	let sendSMSTool: any | null = null
	try {
		return await runTransaction(async (session) => {
			// Step 1: Update business info
			const updatedBusinessInfo = await Business.findByIdAndUpdate(businessId, { $set: { ...updateData } }, { new: true, session })

			if (!updatedBusinessInfo) {
				throw new Error(`No business found with the provided ID: ${businessId}`)
			}
			const businessData = {
				businessName: updatedBusinessInfo.name,
				services: updatedBusinessInfo.services,
				businessHours: updatedBusinessInfo.businessHours,
			}

			// Step 2: Create AI Assistant (VAPI)
			aIAssistant = await createAIAssistant(businessData)
			if (!aIAssistant?.id) {
				throw new Error('Failed to create AI Assistant')
			}

			// Step 3: Purchase Twilio number
			twilioNumber = await getTwilioAvailableNumbers(updateData.address!)
			if (!twilioNumber?.phoneNumber) {
				throw new Error('Failed to purchase a Twilio number')
			}

			// Step 4: Link Twilio number to AI Assistant
			linkedPhoneNumber = await linkTwilioNumberToAIAssistant({
				mobileNumber: twilioNumber.phoneNumber,
				businessName: updatedBusinessInfo.name,
				assistantId: aIAssistant.id,
			})

			// Step 5: Create Send SMS tool
			sendSMSTool = await createSendSMSTool({
				businessName: updatedBusinessInfo.name,
				twilioPhoneNumber: twilioNumber.phoneNumber,
			})
			if (!sendSMSTool?.id) {
				throw new Error('Failed to create Send SMS tool')
			}

			// Step 6: Update AI Assistant with Send SMS tool
			await updateAIAssistantWithSendSMSTool({
				businessData,
				toolId: sendSMSTool.id,
				assistantId: aIAssistant.id,
			})

			// Step 7: Update business with AI assistant settings
			const updatedBusinessDetails = await Business.findByIdAndUpdate(
				businessId,
				{
					$set: {
						aiAgentSettings: {
							assistantId: aIAssistant.id,
							assistantName: aIAssistant.name,
							assistantSetup: 'testing',
							assistantPhoneNumberId: linkedPhoneNumber.id,
							assistantToolId: sendSMSTool.id,
							twilioNumber: twilioNumber.phoneNumber,
							twilioId: twilioNumber.sid,
						},
					},
				},
				{ new: true, session }
			)

			return updatedBusinessDetails
		})
	} catch (error: any) {
		request.log.error('Transaction failed, initiating rollback of external resources', error)

		const rollbackErrors: Error[] = []

		// Step 4 rollback: Unlink phone number from AI assistant
		if (linkedPhoneNumber && twilioNumber && aIAssistant) {
			try {
				await unlinkTwilioNumberFromAIAssistant({
					mobileNumber: twilioNumber?.phoneNumber!,
					assistantId: aIAssistant?.id,
				})
			} catch (err: any) {
				request.log.error('Failed to unlink Twilio number during rollback', err)
				rollbackErrors.push(err)
			}
		}

		// Step 3 rollback: Release Twilio number
		if (twilioNumber?.sid) {
			try {
				await releaseTwilioNumber(twilioNumber.sid)
			} catch (err: any) {
				request.log.error('Failed to release Twilio number during rollback', err)
				rollbackErrors.push(err)
			}
		}

		// Step 2 rollback: Delete AI Assistant
		if (aIAssistant?.id) {
			try {
				await deleteAIAssistant(aIAssistant.id)
			} catch (err: any) {
				request.log.error('Failed to delete AI Assistant during rollback', err)
				rollbackErrors.push(err)
			}
		}

		// Step 5 rollback: Delete Send SMS tool
		if (sendSMSTool?.id) {
			try {
				await deleteSendSMSTool(sendSMSTool.id)
			} catch (err: any) {
				request.log.error('Failed to delete Send SMS tool during rollback', err)
				rollbackErrors.push(err)
			}
		}

		// Log rollback summary if any issues occurred
		if (rollbackErrors.length > 0) {
			request.log.error({
				rollbackErrors,
				assistantId: aIAssistant?.id,
				twilioSid: twilioNumber?.sid,
				message: 'Rollback completed with errors - manual cleanup may be required',
			})
		}

		throw error
	}
}
