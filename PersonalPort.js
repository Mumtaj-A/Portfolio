document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggler
    const navToggler = document.querySelector('.nav-toggler');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggler.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggler.classList.toggle('active');
        navToggler.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    // Close menu when clicking a link on mobile
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 767) {
                navMenu.classList.remove('active');
                navToggler.classList.remove('active');
                navToggler.setAttribute('aria-expanded', 'false');
            }
            // Smooth scroll to section
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set active link on click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Set active link on scroll
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 60;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Typed.js for typing effect
    if (document.querySelector('.typing')) {
        new Typed('.typing', {
            strings: ['Web Designer', 'Web Developer', 'Coder'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // Contact Form Submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                // Client-side validation
                const name = form.querySelector('input[name="name"]').value.trim();
                const email = form.querySelector('input[name="email"]').value.trim();
                const subject = form.querySelector('input[name="subject"]').value.trim();
                const message = form.querySelector('textarea[name="message"]').value.trim();

                if (!name || !email || !subject || !message) {
                    alert('Please fill in all fields.');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                    return;
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    alert('Please enter a valid email address.');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                    return;
                }

                // Submit to Formspree (or replace with PHP endpoint)
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                } else {
                    alert('Failed to send message. Please try again.');
                }
            } catch (error) {
                alert('An error occurred. Please try again later.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }
});