import { getBusinessDetailsById } from './get-business-details-by-id'
import { updateBusinessDetailsById } from './update-business-details-by-id'
import { updateBusinessHoursById } from './update-business-hours-by-id'
import { updateBusinessInformationById } from './update-business-information-by-id'
import { updateBusinessServicesById } from './update-business-services-by-id'

export class BusinessService {
	getBusinessDetailsById = getBusinessDetailsById
	updateBusinessDetailsById = updateBusinessDetailsById
	updateBusinessInformationById = updateBusinessInformationById
	updateBusinessServicesById = updateBusinessServicesById
	updateBusinessHoursById = updateBusinessHoursById
}
