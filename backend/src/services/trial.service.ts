import mongoose from 'mongoose'
import { ITrial, Trial } from '../models/Trial'
export type GetBusinessTrialInput = string
export type GetBusinessTrialOutput = {
	trialStartDate: Date
	trialEndDate: Date
	isExpired: boolean
	trialStatus: 'trial_active' | 'trial_ended'
} | null

export const getBusinessTrial = async (businessId: GetBusinessTrialInput): Promise<GetBusinessTrialOutput> => {
	// Validate businessId format
	if (!mongoose.Types.ObjectId.isValid(businessId)) {
		throw new Error('Invalid businessId format')
	}

	// Find the trial record
	const trial = await Trial.findOne({
		businessId: new mongoose.Types.ObjectId(businessId),
	}).lean<ITrial>()

	// Return null if no trial found
	if (!trial || !trial.trialEndDate) {
		return null
	}

	const now = new Date()
	const endDate = new Date(trial.trialEndDate)

	return {
		trialStartDate: trial.trialStartedAt,
		trialEndDate: endDate,
		isExpired: now > endDate,
		trialStatus: trial.trialStatus as 'trial_active' | 'trial_ended',
	}
}
