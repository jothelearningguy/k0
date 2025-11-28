# Email Setup Instructions

## Prerequisites

1. Node.js installed (v14 or higher)
2. A Gmail account
3. Gmail App Password enabled

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Gmail App Password

Since Gmail requires App Passwords for third-party applications:

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable if not already enabled)
3. Scroll down to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "k0 Residency Server" as the name
6. Click **Generate**
7. Copy the 16-character password (you'll use this in step 3)

### 3. Create Environment File

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Gmail credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   PORT=3000
   ```

   **Important:** Use the Gmail App Password (16 characters), NOT your regular Gmail password.

### 4. Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

### 5. Test the Form

1. Open `http://localhost:3000` in your browser
2. Fill out the waitlist form
3. Submit and check:
   - Your email inbox (k0residencylagos@gmail.com) for the notification
   - The submitter's email for the confirmation email

## Email Configuration

- **Recipient Email:** k0residencylagos@gmail.com (hardcoded in server.js)
- **Sender Email:** Your Gmail account (from .env)
- **Service:** Gmail SMTP

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled on your Google account
- Check that EMAIL_USER and EMAIL_PASS are correct in .env

### "Connection timeout" error
- Check your internet connection
- Verify Gmail SMTP is not blocked by firewall
- Try using a different network

### Emails not received
- Check spam/junk folder
- Verify the recipient email address is correct
- Check server logs for error messages

## Production Deployment

For production, you'll need to:

1. Set environment variables on your hosting platform (Heroku, Railway, Render, etc.)
2. Update the API URL in `script.js` to point to your production server
3. Consider using a service like SendGrid or Mailgun for better deliverability

## Alternative: Using Email Services

If you prefer not to use Gmail SMTP, you can modify `server.js` to use:
- **SendGrid** (recommended for production)
- **Mailgun**
- **Amazon SES**
- **Postmark**

See nodemailer documentation for configuration: https://nodemailer.com/

