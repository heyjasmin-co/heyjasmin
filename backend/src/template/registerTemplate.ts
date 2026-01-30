export const welcomeAfterVerificationTemplate = (name: string, email: string) => {
	const dashboardUrl = `${process.env.FRONTEND_URL}/admin/dashboard`

	return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to heyjasmin</title>
</head>

<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:linear-gradient(180deg,#f5f3ff 0%,#ede9fe 100%);">

  <div style="max-width:640px;margin:40px auto;padding:0 16px;">

    <!-- Logo / Brand -->
    <div style="text-align:center;margin-bottom:24px;">
      <h2 style="margin:0;font-size:28px;font-weight:700;color:#5b21b6;">
        heyjasmin
      </h2>
    </div>

    <!-- Main Card -->
    <div style="
      background:linear-gradient(180deg,#ffffff 0%,#f5f3ff 100%);
      border-radius:20px;
      padding:40px 32px;
      box-shadow:0 10px 30px rgba(124,58,237,0.15);
      border:1px solid #ede9fe;
    ">

      <p style="margin:0 0 20px 0;font-size:18px;color:#111827;">
        Hello ${name},
      </p>

      <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#374151;">
        Thanks for choosing <strong>heyjasmin</strong> as your AI receptionist.
        We’re excited to help you capture every call, book more appointments,
        and keep your business running smoothly 24/7.
      </p>

      <!-- Tagline -->
      <div style="text-align:center;margin:30px 0;">
        <div style="height:1px;background:#e9d5ff;margin-bottom:16px;"></div>
        <p style="margin:0;font-size:18px;font-weight:600;color:#6d28d9;">
          No missed calls. Just happier customers.
        </p>
        <div style="height:1px;background:#e9d5ff;margin-top:16px;"></div>
      </div>

      <!-- Getting Started -->
      <h3 style="margin:30px 0 16px 0;font-size:18px;color:#4c1d95;">
        Getting Started
      </h3>

      <ol style="padding-left:20px;margin:0 0 30px 0;color:#374151;font-size:14px;line-height:1.8;">
        <li>Complete your business profile</li>
        <li>Set up your custom greeting</li>
        <li>Choose how Jasmin handles messages</li>
        <li>Forward your business number to Jasmin</li>
        <li>Sit back while Jasmin handles your calls ✨</li>
      </ol>

      <!-- Account Info -->
      <div style="
        background:#faf5ff;
        border:1px solid #e9d5ff;
        padding:14px 16px;
        border-radius:12px;
        margin-bottom:30px;
      ">
        <p style="margin:0;font-size:13px;color:#6b21a8;">
          <strong>Registered Email:</strong> ${email}
        </p>
      </div>

      <!-- CTA Button -->
      <div style="text-align:center;margin-bottom:30px;">
        <a href="${dashboardUrl}"
          style="
            display:inline-block;
            padding:14px 28px;
            border-radius:12px;
            background:linear-gradient(90deg,#7c3aed,#a78bfa);
            color:#ffffff;
            font-size:15px;
            font-weight:600;
            text-decoration:none;
            box-shadow:0 6px 18px rgba(124,58,237,0.35);
          ">
          → Go to your dashboard
        </a>
      </div>

      <!-- Trial Box -->
      <div style="
        background:#ffffff;
        border-radius:16px;
        padding:20px;
        border:1px solid #e9d5ff;
        box-shadow:0 4px 14px rgba(124,58,237,0.08);
      ">
        <p style="margin:0 0 8px 0;font-size:16px;font-weight:600;color:#6d28d9;">
          🎁 Your free trial has started!
        </p>
        <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">
          Enjoy full access to heyjasmin’s premium features for the next 7 days —
          no commitment, no risk.
        </p>
      </div>

      <!-- Support -->
      <div style="margin-top:30px;font-size:14px;color:#374151;line-height:1.6;">
        <p style="margin:0 0 8px 0;font-weight:600;color:#4c1d95;">
          Need help getting set up?
        </p>
        <p style="margin:0;">
          Just reply to this email or contact us at
          <a href="mailto:info@heyjasmin.co" style="color:#7c3aed;text-decoration:none;">
            info@heyjasmin.co
          </a>
        </p>
      </div>

      <p style="margin-top:24px;font-size:14px;color:#374151;">
        Talk soon,<br/>
        <strong>The heyjasmin team</strong>
      </p>

    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:20px;">
      <p style="font-size:12px;color:#9ca3af;margin:0;">
        © ${new Date().getFullYear()} heyjasmin. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
`
}
