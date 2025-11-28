const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { name, email, university, message } = req.body;

        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name and email are required' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }

        // Get email credentials from environment variables
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        if (!emailUser || !emailPass) {
            console.error('Email credentials not configured');
            return res.status(500).json({ 
                success: false, 
                message: 'Email service not configured. Please contact the administrator.' 
            });
        }

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });

        // Email content for notification
        const mailOptions = {
            from: emailUser,
            to: 'k0residencylagos@gmail.com',
            subject: `New Waitlist Signup: ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #008751; border-bottom: 3px solid #FFD700; padding-bottom: 10px;">
                        New Waitlist Signup - k0 Lagos Residency
                    </h2>
                    
                    <div style="background: #f5f5f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #008751; margin-top: 0;">Contact Information</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        ${university ? `<p><strong>University:</strong> ${university}</p>` : ''}
                    </div>
                    
                    ${message ? `
                    <div style="background: #ffffff; padding: 20px; border-left: 4px solid #008751; margin: 20px 0;">
                        <h3 style="color: #008751; margin-top: 0;">Message</h3>
                        <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
                    </div>
                    ` : ''}
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
                        <p>This email was sent from the k0 Lagos Residency waitlist form.</p>
                        <p>Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' })}</p>
                    </div>
                </div>
            `,
            text: `
New Waitlist Signup - k0 Lagos Residency

Contact Information:
Name: ${name}
Email: ${email}
${university ? `University: ${university}` : ''}

${message ? `Message:\n${message}` : ''}

---
This email was sent from the k0 Lagos Residency waitlist form.
Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' })}
            `
        };

        // Send notification email
        await transporter.sendMail(mailOptions);

        // Send confirmation email to user
        const confirmationMail = {
            from: emailUser,
            to: email,
            subject: 'Welcome to the k0 Lagos Residency Waitlist!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #008751; border-bottom: 3px solid #FFD700; padding-bottom: 10px;">
                        Thank You for Joining Our Waitlist!
                    </h2>
                    
                    <p>Hi ${name},</p>
                    
                    <p>Thank you for joining the waitlist for the <strong>k0 Lagos Founder Residency Program</strong>!</p>
                    
                    <p>We're excited that you're interested in building your startup in Lagos. We'll notify you as soon as applications open for the May 2026 cohort.</p>
                    
                    <div style="background: #f0f8f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #008751;">
                        <h3 style="color: #008751; margin-top: 0;">What's Next?</h3>
                        <ul style="line-height: 1.8;">
                            <li>Keep building and refining your idea</li>
                            <li>Follow us for updates and program announcements</li>
                            <li>We'll email you when applications officially open</li>
                        </ul>
                    </div>
                    
                    <p>If you have any questions, feel free to reach out to us at <a href="mailto:k0residencylagos@gmail.com">k0residencylagos@gmail.com</a>.</p>
                    
                    <p style="margin-top: 30px;">
                        Best regards,<br>
                        <strong>The k0 Lagos Residency Team</strong>
                    </p>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
                        <p>k0 Lagos Residency | Launching May 2026 | Lagos Island, Nigeria</p>
                    </div>
                </div>
            `
        };

        // Send confirmation email
        await transporter.sendMail(confirmationMail);

        return res.status(200).json({ 
            success: true, 
            message: 'Thank you! We\'ll notify you when applications open.' 
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'There was an error processing your request. Please try again later or email us at k0residencylagos@gmail.com.' 
        });
    }
};

