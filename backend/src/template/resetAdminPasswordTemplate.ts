export const adminResetPasswordTemplate = ({ resetPasswordUrl, expiresAt }: { resetPasswordUrl: string; expiresAt: Date }) => {
	const formattedExpiry = new Date(expiresAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})

	return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Password Reset</title>
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
      <!-- Main Card -->
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
          Password Reset Requested
        </h2>

        <p style="font-size: 15px; color: #374151; line-height: 1.6">
          An administrator has requested a password reset for your account.
        </p>

        <p
          style="
            font-size: 15px;
            color: #374151;
            line-height: 1.6;
            margin-top: 16px;
          "
        >
          Click the button below to set a new password. This link will expire on
          <strong>${formattedExpiry}</strong>.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 28px 0">
          <a
            href="${resetPasswordUrl}"
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
            Reset Password
          </a>
        </div>

        <!-- Fallback link -->
        <p style="font-size: 13px; color: #6b7280; line-height: 1.6">
          If the button doesn’t work, copy and paste this link into your
          browser:
        </p>
        <p style="word-break: break-all; font-size: 13px">
          <a
            href="${resetPasswordUrl}"
            style="color: #7c3aed; text-decoration: none"
          >
            ${resetPasswordUrl}
          </a>
        </p>

        <p style="margin-top: 24px; font-size: 14px; color: #6b7280">
          If you did not expect this email, you can safely ignore it.
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
