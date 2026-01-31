export const verifyEmailChangeTemplate = ({ verifyUrl, newEmail }: { verifyUrl: string; newEmail: string }) => {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Verify Email Change</title>
</head>

<body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;background:#f9fafb;color:#111827;">

<div style="max-width:600px;margin:0 auto;background:#ffffff;padding:32px;border-radius:12px;border:1px solid #e5e7eb;">

<h2 style="color:#4f46e5;margin-bottom:16px;">Verify Your New Email Address</h2>

<p style="font-size:16px;margin-bottom:12px;">
You have requested to change your admin email address to: <strong>${newEmail}</strong>.
</p>

<p style="font-size:15px;margin-bottom:20px;">
To complete this change, please click the button below to verify your request. This link is sent to your <strong>current</strong> email address for security.
</p>

<div style="text-align:center;margin-bottom:24px;">
<a href="${verifyUrl}" style="background-color:#4f46e5;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">
Confirm Email Change
</a>
</div>

<p style="margin-bottom:24px;">
If the button doesn't work, copy and paste this link into your browser:
<br/>
<a href="${verifyUrl}" style="color:#4f46e5;word-break:break-all;">
${verifyUrl}
</a>
</p>

<p style="font-size:14px;color:#6b7280;">
If you did not request this change, please ignore this email or contact support if you suspect unauthorized activity.
</p>

</div>

</body>
</html>
`
}
