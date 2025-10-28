import { VapiClient } from '@vapi-ai/server-sdk'
import config from '../config'
export const vapiClient = new VapiClient({ token: config.VAPI_API_KEY! })
