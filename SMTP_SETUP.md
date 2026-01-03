# SMTP Email Setup

This document explains how to configure SMTP email for the contact forms.

## Required Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# SMTP Server Host (e.g., smtp.gmail.com, smtp.sendgrid.net, smtp.mailgun.org)
SMTP_HOST=smtp.gmail.com

# SMTP Port (587 for TLS, 465 for SSL, 25 for unencrypted)
SMTP_PORT=587

# SMTP Username (your email address or SMTP username)
SMTP_USER=your-email@example.com

# SMTP Password (your email password or app-specific password)
# For Gmail, you may need to use an App Password instead of your regular password
# Generate one at: https://myaccount.google.com/apppasswords
SMTP_PASSWORD=your-password-or-app-password

# Email address to send FROM (defaults to SMTP_USER if not set)
SMTP_FROM=your-email@example.com

# Email address to send TO (where you want to receive form submissions)
# Defaults to SMTP_USER if not set
SMTP_TO=your-email@example.com
```

## Common SMTP Providers

### Gmail
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Note:** For Gmail, you'll need to:
1. Enable 2-Factor Authentication
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Use the App Password instead of your regular password

### SendGrid
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

### Mailgun
```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASSWORD=your-mailgun-password
```

### Outlook/Office 365
```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```

## Testing

After setting up your environment variables:

1. Restart your development server
2. Fill out the contact form or book call form
3. Submit the form
4. Check your email inbox (and spam folder) for the submission

## Troubleshooting

- **"Email service not configured"**: Make sure all required environment variables are set
- **Authentication failed**: Check your SMTP credentials, especially for Gmail (use App Password)
- **Connection timeout**: Verify your SMTP_HOST and SMTP_PORT are correct
- **Emails going to spam**: Check your SPF/DKIM records for your domain



