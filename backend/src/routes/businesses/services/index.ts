import { getBusinessDetailsById } from './get-business-details-by-id'
import { updateBusinessDetailsById } from './update-business-details-by-id'
import { updateBusinessInformationById } from './update-business-information-by-id'

export class BusinessService {
	getBusinessDetailsById = getBusinessDetailsById
	updateBusinessDetailsById = updateBusinessDetailsById
	updateBusinessInformationById = updateBusinessInformationById
}
