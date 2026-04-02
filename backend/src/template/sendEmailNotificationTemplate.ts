export const sendEmailNotificationTemplate = ({
	businessName,
	callSummary,
	callRecordingUrl,
	customerPhoneNumber,
	dashboardUrl,
}: {
	businessName: string
	callSummary: string
	callRecordingUrl: string
	customerPhoneNumber: string
	dashboardUrl: string
}) => {
	return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New call notification</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      font-family: 'Outfit', Arial, Helvetica, sans-serif;
      background-color: #ffffff;
      color: #111827;
    "
  >
    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px">
      <!-- Logo -->
      <div style="text-align: center; margin-bottom: 40px">
        <img
          src="https://res.cloudinary.com/dpsscnm8i/image/upload/v1770143646/websiteLogo_plvlmx.png"
          alt="heyjasmin Logo"
          style="width: 140px"
        />
      </div>

      <!-- Heading -->
      <div style="text-align: center; margin-bottom: 40px">
        <h1 style="font-size: 24px; font-weight: 700; color: #4c1d95; margin: 0; line-height: 1.3">
          New call for ${businessName}
        </h1>
      </div>

      <!-- Call Summary Section -->
      <div style="margin-bottom: 32px">
        <h2 style="font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 16px 0">
          Call summary
        </h2>
        <p style="font-size: 16px; line-height: 1.6; color: #374151; margin: 0 0 16px 0">
          ${callSummary}
        </p>
        ${
					callRecordingUrl
						? `
        <a href="${callRecordingUrl}" style="font-size: 16px; color: #7c3aed; text-decoration: underline; font-weight: 600">
          Listen to call recording
        </a>
        `
						: ''
				}
      </div>

      <!-- Call Details Section -->
      <div style="margin-bottom: 48px">
        <h2 style="font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 16px 0">
          Call details
        </h2>
        <div style="font-size: 16px; color: #374151">
          <p style="margin: 0">
            <strong>Phone number:</strong> 
            <a href="tel:${customerPhoneNumber}" style="color: #7c3aed; text-decoration: underline">
              ${customerPhoneNumber}
            </a>
          </p>
        </div>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 48px">
        <a
          href="${dashboardUrl}"
          style="
            display: inline-block;
            padding: 16px 32px;
            border-radius: 9999px;
            background-color: #a855f7;
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);
          "
        >
          View call in your dashboard
        </a>
      </div>

      <!-- Footer -->
      <div style="text-align: center; border-top: 1px solid #f3f4f6; pt: 32px">
        <p style="font-size: 14px; color: #6b7280; margin: 24px 0 0 0">
          © ${new Date().getFullYear()} heyjasmin. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`
}
