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

<body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;background:#f9fafb;color:#111827;">

<div style="max-width:600px;margin:0 auto;background:#ffffff;padding:32px;border-radius:12px;border:1px solid #e5e7eb;">

<p style="font-size:16px;margin-bottom:12px;">
An administrator has requested a password reset for your account.
</p>

<p style="font-size:15px;margin-bottom:20px;">
Click the link below to set a new password. This link will expire on
<strong>${formattedExpiry}</strong>.
</p>

<p style="margin-bottom:24px;">
<a href="${resetPasswordUrl}" style="color:#2563eb;text-decoration:none;">
${resetPasswordUrl}
</a>
</p>

<p style="font-size:14px;color:#6b7280;">
If you did not expect this email, you can safely ignore it.
</p>

</div>

</body>
</html>
`
}
