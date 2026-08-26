// ============================================
// MISHAL AL NOOR TECHNICAL SERVICES WEBSITE
// JavaScript - Interactivity & Functionality
// ============================================

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu on hamburger click
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transition = 'all 0.3s ease';
    });
    
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});

// ============================================
// SMOOTH SCROLLING & ACTIVE NAV HIGHLIGHTING
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    // Get all section elements
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--secondary-color)';
            link.style.fontWeight = '600';
        } else {
            link.style.color = 'var(--text-dark)';
            link.style.fontWeight = '500';
        }
    });
});

// ============================================
// CONTACT FORM SUBMISSION
// ============================================

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !phone || !message) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }

    const phoneRegex = /^[0-9\s\-\+\(\)]+$/;

    if (!phoneRegex.test(phone)) {
        showAlert('Please enter a valid phone number', 'error');
        return;
    }

    // Send form to Web3Forms
    try {
      const formData = new FormData(contactForm);

formData.append('access_key', '991b5a5f-8828-41be-88aa-dbd68656c4b6');

const object = Object.fromEntries(formData);
const json = JSON.stringify(object);

const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: json
});

        const result = await response.json();

        if (result.success) {
            showAlert(
                'Thank you! Your message has been sent successfully.',
                'success'
            );

            contactForm.reset();
        } else {
            showAlert(
                'Sorry, your message could not be sent. Please try again.',
                'error'
            );

            console.error('Web3Forms Error:', result);
        }

    } catch (error) {
        console.error('Form Error:', error);

        showAlert(
            'Something went wrong. Please try again.',
            'error'
        );
    }
});
// ============================================
// ALERT NOTIFICATION SYSTEM
// ============================================

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        max-width: 90%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f97316',
        info: '#0ea5e9'
    };
    
    alert.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(alert);
    
    // Remove alert after 4 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 4000);
}

// ============================================
// WHATSAPP FLOATING BUTTON
// ============================================

const whatsappBtn = document.getElementById('whatsapp-btn');

// Floating WhatsApp button hover effects
if (whatsappBtn) {
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'scale(1.15)';
    });

    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'scale(1)';
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe service cards, reason cards, contact cards and other elements
    const elements = document.querySelectorAll('.service-card, .reason-card, .stat, .contact-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Call observer when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

// ============================================
// NAVBAR HIDE ON SCROLL DOWN, SHOW ON SCROLL UP
// ============================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > navbarHeight) {
        if (scrollTop > lastScrollTop) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.transition = 'transform 0.3s ease';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
            navbar.style.transition = 'transform 0.3s ease';
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// ADD ANIMATIONS STYLES DYNAMICALLY
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// FORM FIELD VALIDATION IN REAL-TIME
// ============================================

const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--secondary-color)';
    });
});

function validateField(field) {
    const value = field.value.trim();
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            field.style.borderColor = '#ef4444';
            return false;
        }
    }
    
    if (field.type === 'tel') {
        const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
        if (value && !phoneRegex.test(value)) {
            field.style.borderColor = '#ef4444';
            return false;
        }
    }
    
    if (!value && field.required) {
        field.style.borderColor = '#ef4444';
        return false;
    }
    
    field.style.borderColor = 'var(--border-color)';
    return true;
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('lazy-loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// UTILITY: GET CURRENT YEAR FOR FOOTER
// ============================================

function updateFooterYear() {
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.textContent = footerText.textContent.replace(/\d{4}/, year.toString());
    }
}

updateFooterYear();

// ============================================
// CONSOLE LOG - WELCOME MESSAGE
// ============================================

console.log('%c Welcome to MISHAL AL NOOR TECHNICAL SERVICES', 'color: #0ea5e9; font-size: 16px; font-weight: bold;');
console.log('%c Professional Technical Solutions in Dubai, UAE', 'color: #1e3a8a; font-size: 14px;');
console.log('%c WhatsApp: +971 50 148 5297 | Phone: +971 50 148 5297 | Email: mishalalnoortec@gmail.com', 'color: #10b981; font-size: 12px;');
console.log('%c https://github.com/mishalalnoortechnical-ux/mishal-al-noor-website', 'color: #f97316; font-size: 12px;');
