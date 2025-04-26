// This file is intended for JavaScript functionality, such as form validation or handling user interactions on the landing page.

document.addEventListener('DOMContentLoaded', function() {
    // Interactive floating elements
    const floatingElements = document.querySelectorAll('.floating-circle, .floating-square');
    
    // Mouse parallax effect for floating elements
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 0.05;
            const x = (mouseX - 0.5) * 100 * speed;
            const y = (mouseY - 0.5) * 100 * speed;
            el.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });

    // Form handling
    const form = document.getElementById('waitlist-form');
    const inputs = form.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (validateEmail(email)) {
            showSuccessMessage(name);
            form.reset();
        }
    });

    // Smooth scroll handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for blobs
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.blob-effect');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = index + 1;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    initThemeSwitch();
});

// Utility Functions
function showSuccessMessage(name) {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thanks ${name}! We'll keep you updated.</p>
    `;
    
    document.getElementById('waitlist-form').appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function scrollToForm() {
    document.getElementById('signup').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Theme handling
function initThemeSwitch() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'light';

    themeToggle.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}