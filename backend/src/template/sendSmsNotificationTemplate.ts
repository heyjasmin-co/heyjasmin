export const sendSmsNotificationTemplate = ({
	businessName,
	callSummary,
	customerPhoneNumber,
}: {
	businessName: string
	callSummary: string
	customerPhoneNumber: string
}) => {
	return `
Call answered.
New call for ${businessName}
Phone: ${customerPhoneNumber}
Summary: ${callSummary}`
}
