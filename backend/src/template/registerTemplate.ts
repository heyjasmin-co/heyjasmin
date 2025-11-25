export const welcomeAfterVerificationTemplate = (name: string, email: string) => {
	return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome Email</title>
    </head>

    <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f3f4f6;">
      <div style="max-width:600px; margin:40px auto; background:white; border-radius:20px; border:1px solid #e5e7eb; box-shadow:0 4px 16px rgba(0,0,0,0.1); overflow:hidden;">

        <!-- Header -->
        <div style="background:linear-gradient(to bottom, #ede9fe, #ffffff); text-align:center; padding:40px;">
          <h1 style="margin:0; font-size:28px; font-weight:bold; color:#7c3aed;">
            Welcome to heyjasmin 🎉
          </h1>
        </div>

        <!-- Body -->
        <div style="padding:32px;">
          <h2 style="margin:0 0 16px 0; font-size:20px; font-weight:bold; color:#111827;">Hello, ${name}!</h2>

          <p style="margin:0 0 16px 0; font-size:15px; color:#374151; line-height:1.6;">
            Your email has been successfully verified. 🎉  
            We’re excited to welcome you to <strong>heyjasmin</strong>!
          </p>

          <!-- User Info -->
          <div style="background:#f3e8ff; padding:16px; border-radius:12px; border:1px solid #ddd6fe; margin-top:16px;">
            <p style="margin:0; font-size:15px; color:#4f46e5;"><strong>Name:</strong> ${name}</p>
            <p style="margin:4px 0 0 0; font-size:15px; color:#4f46e5;"><strong>Email:</strong> ${email}</p>
          </div>

          <p style="margin:24px 0 0 0; font-size:15px; color:#374151;">
            You can now access your account, explore the platform, and enjoy all available features.
          </p>

          <p style="margin:16px 0 0 0; font-size:15px; color:#374151;">
            If you ever need assistance, our support team is always here to help.
          </p>

          <p style="margin:24px 0 0 0; font-size:13px; color:#6b7280;">
            If you didn’t perform this action, please ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#f9fafb; text-align:center; padding:16px;">
          <p style="margin:0; font-size:13px; color:#9ca3af;">
            © ${new Date().getFullYear()} heyjasmin. All rights reserved.
          </p>
        </div>

      </div>
    </body>
  </html>
  `
}
