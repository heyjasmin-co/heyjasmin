import { IBusiness } from '../../../models'
import { getBusinessDetailsByIdParamsSchema } from '../handlers/types'

export type GetBusinessDetailsInput = typeof getBusinessDetailsByIdParamsSchema._type
export type GetBusinessDetailOutput = IBusiness | null
