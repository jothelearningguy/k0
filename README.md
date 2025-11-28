# k0 - Lagos Founder Residency Program

A modern, responsive website for the Lagos Founder Residency Program launching in May 2026.

## Overview

This website showcases the k0 Lagos Founder Residency, a 3-month program designed to support early-stage founders and creators building impactful companies in Lagos, Nigeria.

## Features

- **Modern, Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Comprehensive Program Information**: All key details about the residency program
- **Application Waitlist**: Form to collect interest from potential applicants
- **Smooth Animations**: Engaging user experience with fade-in animations
- **Mobile-Friendly Navigation**: Hamburger menu for mobile devices

## Project Structure

```
lagosresidency/
├── index.html          # Main HTML file
├── benefits.html       # Benefits page
├── who-should-apply.html # Who Should Apply page
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── server.js           # Node.js backend for email
├── package.json        # Node.js dependencies
├── .env.example        # Environment variables template
├── SETUP.md            # Email setup instructions
└── README.md           # This file
```

## Getting Started

### Static Website (No Backend)

1. Open `index.html` in a web browser
2. No build process or dependencies required

### With Email Backend

1. Install Node.js dependencies: `npm install`
2. Set up email configuration (see [SETUP.md](SETUP.md))
3. Start the server: `npm start`
4. Open `http://localhost:3000` in your browser

## Sections Included

- **Hero Section**: Eye-catching introduction with key program details
- **Program Overview**: Benefits and what the program provides
- **Why Lagos Needs This**: Addressing local challenges
- **Selection Philosophy**: Focus on the person, not the idea
- **Social Impact**: Building for Lagos communities
- **Workshops & Activities**: Training and bonding opportunities
- **Building Resilience**: Challenge structure and testing
- **Creative Residency**: Welcome to artists and creators
- **Target Universities**: Recruitment focus areas
- **Pre-Launch Events**: Event series information
- **Program Leadership**: Team members
- **Application Section**: Waitlist signup form

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0066FF;
    --secondary-color: #FF6B35;
    /* ... */
}
```

### Content
All content is in `index.html` - edit directly to update text, add sections, or modify structure.

### Form Submission
The waitlist form sends emails to **k0residencylagos@gmail.com** when submitted. 

**Setup Required:**
1. See [SETUP.md](SETUP.md) for detailed email configuration instructions
2. Configure Gmail App Password in `.env` file
3. Start the Node.js server: `npm start`

The form sends:
- Notification email to k0residencylagos@gmail.com with applicant details
- Confirmation email to the applicant

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Email Setup

The waitlist form is configured to send emails. See [SETUP.md](SETUP.md) for complete setup instructions.

**Quick Setup:**
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env`
3. Add your Gmail credentials (with App Password)
4. Run: `npm start`

## Future Enhancements

- Application portal
- Blog/news section
- Partner showcase
- Alumni testimonials
- Event calendar
- Gallery/media section

## License

© 2025 k0 Lagos Residency. All rights reserved.

