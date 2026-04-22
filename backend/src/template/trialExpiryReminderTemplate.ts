import config from '../config'

export const trialExpiryReminderTemplate = (firstName: string, lastName: string, businessName: string) => {
	const billingUrl = `${config.FRONTEND_URL}/admin/dashboard/account/billing`

	return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your free trial for ${businessName} is over — keep Jasmin working for you</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      font-family: 'Outfit', Arial, Helvetica, sans-serif;
      background: linear-gradient(180deg, #f5f3ff 0%, #ede9fe 100%);
      color: #111827;
    "
  >
    <div style="max-width: 640px; margin: 40px auto; padding: 0 16px">
      <!-- Main Card -->
      <div
        style="
          background: #ffffff;
          border-radius: 20px;
          padding: 40px 32px;
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.1);
          border: 1px solid #ede9fe;
        "
      >
        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 32px">
          <img
            src="https://res.cloudinary.com/dpsscnm8i/image/upload/v1770143646/websiteLogo_plvlmx.png"
            alt="heyjasmin Logo"
            style="width: 160px"
          />
        </div>

        <p style="margin: 0 0 20px 0; font-size: 18px; color: #111827">
          Hey ${firstName} ${lastName},
        </p>

        <p
          style="
            margin: 0 0 24px 0;
            font-size: 16px;
            font-weight: 600;
            color: #6d28d9;
          "
        >
          Your 7-day free trial for <strong>${businessName}</strong> has ended.
        </p>

        <p
          style="
            margin: 0 0 24px 0;
            font-size: 15px;
            line-height: 1.6;
            color: #374151;
          "
        >
          Over the past week, you got a glimpse of what it’s like to have Jasmin handling your calls in the background.
        </p>

        <p
          style="
            margin: 0 0 16px 0;
            font-size: 16px;
            font-weight: 700;
            color: #4c1d95;
          "
        >
          Upgrading unlocks the real value:
        </p>

        <p
          style="
            margin: 0 0 24px 0;
            font-size: 15px;
            line-height: 1.6;
            color: #374151;
          "
        >
          Jasmin becomes your always-on front desk.
        </p>

        <ul style="padding-left: 20px; margin: 0 0 24px 0; color: #374151; font-size: 15px; line-height: 1.8;">
          <li>Every call gets answered.</li>
          <li>Every inquiry gets handled.</li>
          <li>Every opportunity gets captured.</li>
        </ul>

        <p
          style="
            margin: 0 0 30px 0;
            font-size: 15px;
            line-height: 1.6;
            color: #374151;
          "
        >
          No more worrying about missed calls or delayed responses. Just a smoother, more responsive experience for your customers.
        </p>

        <p
          style="
            margin: 0 0 20px 0;
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            text-align: center;
          "
        >
          Ready to keep things running?
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin-bottom: 30px">
          <a
            href="${billingUrl}"
            style="
              display: inline-block;
              padding: 16px 36px;
              border-radius: 12px;
              background: linear-gradient(90deg, #7c3aed, #a78bfa);
              color: #ffffff;
              font-size: 16px;
              font-weight: 700;
              text-decoration: none;
              box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
            "
          >
            👉 Activate Jasmin
          </a>
        </div>

        <p
          style="
            margin: 0 0 30px 0;
            font-size: 14px;
            color: #6b7280;
            text-align: center;
          "
        >
          Takes less than a minute—and everything you set up is ready to go.
        </p>

        <div style="height: 1px; background: #ede9fe; margin: 30px 0"></div>

        <p style="margin: 0; font-size: 15px; color: #4b5563">
          — Team <strong>heyjasmin</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align: center; margin-top: 24px">
        <p style="font-size: 12px; color: #9ca3af; margin: 0">
          © ${new Date().getFullYear()} heyjasmin. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`
}
