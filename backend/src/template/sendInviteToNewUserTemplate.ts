export const sendInviteToNewUserTemplate = ({
	businessName,
	email,
	invitationUrl,
	role,
	expiresAt,
}: {
	businessName: string
	email: string
	invitationUrl: string
	role: string
	expiresAt: Date
}) => {
	const formattedExpiry = new Date(expiresAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

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

<!-- Brand -->
<div style="text-align:center;margin-bottom:24px;">
<h2 style="margin:0;font-size:28px;font-weight:700;color:#5b21b6;">
heyjasmin
</h2>
</div>

<!-- Card -->
<div style="
background:linear-gradient(180deg,#ffffff 0%,#f5f3ff 100%);
border-radius:20px;
padding:40px 32px;
box-shadow:0 10px 30px rgba(124,58,237,0.15);
border:1px solid #ede9fe;
">

<p style="font-size:18px;">Hello ${businessName},</p>

<p style="font-size:15px;line-height:1.6;color:#374151;">
You've been invited to join <strong>heyjasmin</strong>.
Click below to activate your account.
</p>

<!-- Invite Details Box -->
<div style="
background:#faf5ff;
border:1px solid #e9d5ff;
padding:16px;
border-radius:12px;
margin:20px 0;
font-size:14px;
color:#4c1d95;
">

<p style="margin:4px 0;">
<strong>Invited Email:</strong> ${email}
</p>

<p style="margin:4px 0;">
<strong>Role:</strong> ${role}
</p>

<p style="margin:4px 0;">
<strong>Expires On:</strong> ${formattedExpiry}
</p>

</div>

<!-- CTA Button -->
<div style="text-align:center;margin:30px 0;">
<a href="${invitationUrl}"
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
Accept Invitation
</a>
</div>

<!-- Fallback Link -->
<p style="font-size:13px;color:#6b7280;">
If the button doesn't work, copy and paste this link:
</p>

<p style="font-size:13px;color:#7c3aed;word-break:break-all;">
${invitationUrl}
</p>

<p style="margin-top:24px;">
Talk soon,<br/>
<strong>The heyjasmin team</strong>
</p>

</div>

<!-- Footer -->
<div style="text-align:center;margin-top:20px;">
<p style="font-size:12px;color:#9ca3af;">
© ${new Date().getFullYear()} heyjasmin. All rights reserved.
</p>
</div>

</div>
</body>
</html>
`
}
