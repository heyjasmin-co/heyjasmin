import cron from 'node-cron'
import transporter from '../config/nodemailer'
import config from '../config'
import { Trial } from '../models/Trial'
import { BusinessPlan } from '../models/BusinessPlan'
import { Business } from '../models/Business'
import { User } from '../models/User'
import { trialExpiryReminderTemplate } from '../template/trialExpiryReminderTemplate'

export const initCronJobs = () => {
	// Run every day at midnight (00:00)
	cron.schedule('0 0 * * *', async () => {
		console.log('[CRON] Starting trial expiry check...')
		try {
			await handleTrialExpiries()
		} catch (error) {
			console.error('[CRON] Error handling trial expiries:', error)
		}
	})
}

export const handleTrialExpiries = async () => {
	const now = new Date()

	// 1. Mark trials as ended if they past their end date
	const expiredTrials = await Trial.updateMany(
		{
			trialEndDate: { $lte: now },
			trialStatus: 'trial_active',
		},
		{
			$set: { trialStatus: 'trial_ended' },
		}
	)

	if (expiredTrials.modifiedCount > 0) {
		console.log(`[CRON] Marked ${expiredTrials.modifiedCount} trials as ended.`)
	}

	// 2. Find trials that ended at least 7 days ago but reminder hasn't been sent
	const sevenDaysAgo = new Date()
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

	const trialsToNotify = await Trial.find({
		trialStatus: 'trial_ended',
		trialEndDate: { $lte: sevenDaysAgo },
		expiryReminderSent: { $ne: true },
	})

	for (const trial of trialsToNotify) {
		try {
			// Check if they upgraded to a paid plan
			const activePlan = await BusinessPlan.findOne({
				businessId: trial.businessId,
				subscriptionStatus: 'active',
			})

			// If they have an active plan, they already upgraded, just mark reminder as sent (or not needed)
			if (activePlan) {
				trial.expiryReminderSent = true
				await trial.save()
				continue
			}

			// Find business and owner details
			const business = await Business.findById(trial.businessId)
			if (!business || !business.ownerUserId) {
				continue
			}

			const owner = await User.findById(business.ownerUserId)
			if (!owner) {
				continue
			}

			// Send the reminder email
			const emailHtml = trialExpiryReminderTemplate(owner.firstName, owner.lastName, business.name)
			
			await transporter.sendMail({
				from: config.NODEMAILER_EMAIL_USER,
				to: owner.email,
				subject: 'Your free trial is over — keep Jasmin working for you',
				html: emailHtml,
			})

			// Mark as sent
			trial.expiryReminderSent = true
			await trial.save()

			console.log(`[CRON] Sent trial expiry reminder to ${owner.email} for business ${business.name}`)
		} catch (err) {
			console.error(`[CRON] Error processing trial reminder for business ${trial.businessId}:`, err)
		}
	}
}
