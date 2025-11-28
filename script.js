// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Ensure form inputs are interactive
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('#applicationForm input, #applicationForm textarea');
    inputs.forEach(input => {
        input.removeAttribute('disabled');
        input.removeAttribute('readonly');
        input.style.pointerEvents = 'auto';
        input.style.cursor = 'text';
    });
});

// Form Submission
const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
    applicationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(applicationForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            university: formData.get('university') || '',
            message: formData.get('message') || ''
        };
        
        // Get submit button and disable it
        const submitButton = applicationForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        
        // Remove any existing messages
        const existingMessage = applicationForm.querySelector('.success-message, .error-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        try {
            // Use relative path for API endpoint (works for both localhost and Vercel)
            const apiUrl = '/api/waitlist';
            
            // Send data to backend
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.cssText = `
                    background: #10B981;
                    color: white;
                    padding: 16px 24px;
                    border-radius: 8px;
                    margin-top: 24px;
                    text-align: center;
                    font-weight: 600;
                `;
                successMessage.textContent = '✓ ' + result.message;
                
                applicationForm.appendChild(successMessage);
                applicationForm.reset();
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                throw new Error(result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Determine error type
            let errorText = 'There was an error submitting your form. ';
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                errorText += 'The server is not running. Please start the server with "npm start" or email us directly at k0residencylagos@gmail.com';
            } else if (error.message) {
                errorText += error.message;
            } else {
                errorText += 'Please try again or email us at k0residencylagos@gmail.com';
            }
            
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.style.cssText = `
                background: #DC2626;
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                margin-top: 24px;
                text-align: center;
                font-weight: 600;
                line-height: 1.6;
            `;
            errorMessage.innerHTML = `✗ ${errorText}<br><br><a href="mailto:k0residencylagos@gmail.com?subject=Waitlist Signup&body=Name: ${encodeURIComponent(data.name)}%0AEmail: ${encodeURIComponent(data.email)}%0AUniversity: ${encodeURIComponent(data.university || 'N/A')}%0A%0AMessage:%0A${encodeURIComponent(data.message || 'N/A')}" style="color: white; text-decoration: underline;">Click here to email us directly</a>`;
            
            applicationForm.appendChild(errorMessage);
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.overview-card, .challenge-item, .impact-card, .event-card, .challenge-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

