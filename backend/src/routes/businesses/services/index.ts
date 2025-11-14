import { getBusinessDetailsById } from './get-business-details-by-id'
import { updateBusinessDetailsById } from './update-business-details-by-id'
import { updateBusinessHoursById } from './update-business-hours-by-id'
import { updateBusinessInformationById } from './update-business-information-by-id'
import { updateBusinessServicesById } from './update-business-services-by-id'
import { updateBusinessAssistantSetupById } from './update-business-assistant-setup-by-id'
import { updateBusinessAssistantById } from './update-business-assistance-by-id'
import { CreateBusinessGoogleProfile } from './create-business-google-profile'

export class BusinessService {
	getBusinessDetailsById = getBusinessDetailsById
	updateBusinessDetailsById = updateBusinessDetailsById
	updateBusinessInformationById = updateBusinessInformationById
	updateBusinessServicesById = updateBusinessServicesById
	updateBusinessHoursById = updateBusinessHoursById
	updateBusinessAssistantSetupById = updateBusinessAssistantSetupById
	updateBusinessAssistantById = updateBusinessAssistantById
	createBusinessGoogleProfile = CreateBusinessGoogleProfile
}
