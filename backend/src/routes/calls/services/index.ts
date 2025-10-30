import { getCallById } from './get-call-by-id'
import { getCallsByBusinessId } from './get-calls-by-business-id'

export class CallService {
	getCallsByBusinessId = getCallsByBusinessId
	getCallById = getCallById
}
