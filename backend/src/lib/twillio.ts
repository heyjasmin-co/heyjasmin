import twilio from 'twilio'
import config from '../config'

if (!config.TWILIO_ACCOUNT_SID || !config.TWILIO_AUTH_TOKEN) {
  console.error("❌ Missing Twilio credentials:");
  console.error("TWILIO_ACCOUNT_SID =", config.TWILIO_ACCOUNT_SID);
  console.error("TWILIO_AUTH_TOKEN =", config.TWILIO_AUTH_TOKEN);
  throw new Error("Twilio credentials not found. Check your .env and config setup.");
}

export const twilioClient = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)
