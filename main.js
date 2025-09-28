// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Populate content from config
    populateContent();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup navbar scroll effect
    setupNavbarScroll();
    
    // Initialize reviews carousel - show first card
    if (reviews.length > 0) {
        reviews[0].classList.add('active');
    }
    
    // Setup reviews carousel
    autoRotateReviews();
});

// Populate page content from config
function populateContent() {
    // Phone button (main page)
    const phoneBtn = document.getElementById('phone-btn');
    if (phoneBtn) {
        phoneBtn.href = `tel:${window.CONFIG.tel}`;
        phoneBtn.querySelector('.btn-text').textContent = window.CONFIG.phone;
    }
    
    // WhatsApp button (main page)
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.href = window.CONFIG.whatsappLink;
    }
    
    // CTA Phone button (hakkimizda page)
    const ctaPhoneBtn = document.getElementById('cta-phone-btn');
    if (ctaPhoneBtn) {
        ctaPhoneBtn.href = `tel:${window.CONFIG.tel}`;
        ctaPhoneBtn.querySelector('.btn-text').textContent = window.CONFIG.phone;
    }
    
    // CTA WhatsApp button (hakkimizda page)
    const ctaWhatsappBtn = document.getElementById('cta-whatsapp-btn');
    if (ctaWhatsappBtn) {
        ctaWhatsappBtn.href = window.CONFIG.whatsappLink;
    }
    
    // Footer address
    const footerAddress = document.getElementById('footer-address');
    if (footerAddress) {
        footerAddress.textContent = window.CONFIG.address;
    }
    
    // Contact address (iletisim page)
    const contactAddress = document.getElementById('contact-address');
    if (contactAddress) {
        contactAddress.textContent = window.CONFIG.contactAddress;
    }
}

// Setup mobile hamburger menu
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

function goToSlide(n) {
    currentSlide = n - 1;
    showSlide(currentSlide);
}

// Setup navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Reviews carousel functionality
let currentReview = 0;
const reviews = document.querySelectorAll('.review-card');

function changeReview(direction) {
    reviews[currentReview].classList.remove('active');
    
    currentReview += direction;
    
    if (currentReview >= reviews.length) {
        currentReview = 0;
    } else if (currentReview < 0) {
        currentReview = reviews.length - 1;
    }
    
    reviews[currentReview].classList.add('active');
}

// Auto-rotate reviews every 5 seconds
function autoRotateReviews() {
    setInterval(function() {
        changeReview(1);
    }, 5000);
}

// FAQ functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('.faq-icon');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    answer.classList.toggle('active');
    
    // Change icon
    if (answer.classList.contains('active')) {
        icon.textContent = '−';
    } else {
        icon.textContent = '+';
    }
}
