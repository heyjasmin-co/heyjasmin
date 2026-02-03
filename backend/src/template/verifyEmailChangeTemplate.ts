export const verifyEmailChangeTemplate = ({ verifyUrl, newEmail }: { verifyUrl: string; newEmail: string }) => {
	return `
<!DocType html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Email Change</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: linear-gradient(180deg, #f5f3ff 0%, #ede9fe 100%);
    "
  >
    <div style="max-width: 640px; margin: 40px auto; padding: 0 16px">
      <!-- Card -->
      <div
        style="
          background: linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%);
          border-radius: 20px;
          padding: 36px 32px;
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.15);
          border: 1px solid #ede9fe;
        "
      >
        <!-- Logo -->
        <div style="text-align: center">
          <img
            src="https://res.cloudinary.com/dpsscnm8i/image/upload/v1770143646/websiteLogo_plvlmx.png"
            alt="heyjasmin Logo"
            style="width: 160px"
          />
        </div>
        <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #4c1d95">
          Verify Your New Email Address
        </h2>

        <p style="font-size: 15px; color: #374151; line-height: 1.6">
          You have requested to change your admin email address to
          <strong>${newEmail}</strong>.
        </p>

        <p
          style="
            font-size: 15px;
            color: #374151;
            line-height: 1.6;
            margin-top: 16px;
          "
        >
          To complete this change, please confirm by clicking the button below.
          For security reasons, this email was sent to your
          <strong>current</strong>
          email address.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 28px 0">
          <a
            href="${verifyUrl}"
            style="
              display: inline-block;
              padding: 14px 28px;
              border-radius: 12px;
              background: linear-gradient(90deg, #7c3aed, #a78bfa);
              color: #ffffff;
              font-size: 15px;
              font-weight: 600;
              text-decoration: none;
              box-shadow: 0 6px 18px rgba(124, 58, 237, 0.35);
            "
          >
            Confirm Email Change
          </a>
        </div>

        <!-- Fallback Link -->
        <p style="font-size: 13px; color: #6b7280; line-height: 1.6">
          If the button doesn’t work, copy and paste this link into your
          browser:
        </p>

        <p style="font-size: 13px; word-break: break-all">
          <a href="${verifyUrl}" style="color: #7c3aed; text-decoration: none">
            ${verifyUrl}
          </a>
        </p>

        <p style="margin-top: 24px; font-size: 14px; color: #6b7280">
          If you did not request this change, please ignore this email or
          contact support if you suspect unauthorized activity.
        </p>

        <p style="margin-top: 24px; font-size: 14px; color: #374151">
          <strong>The heyjasmin team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align: center; margin-top: 20px">
        <p style="font-size: 12px; color: #9ca3af; margin: 0">
          © ${new Date().getFullYear()} heyjasmin. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>

`
}
