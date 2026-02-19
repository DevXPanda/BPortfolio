/* ============================================
   PRIYA YADAV PORTFOLIO — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const handleNavScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll);

    // ---- Active Nav Link on Scroll ----
    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);

    // ---- Mobile Menu Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ---- Hero Typing Effect ----
    const heroTitle = document.getElementById('heroTitle');
    const titles = [
        'Marketing Professional',
        'MBA Graduate',
        'Client Services Executive',
        'HR Enthusiast',
        'Relationship Manager'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    };

    typeEffect();

    // ---- Hero Particles ----
    const particlesContainer = document.getElementById('heroParticles');

    const createParticles = () => {
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 8 + 3;
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 15 + 10;
            const opacity = Math.random() * 0.15 + 0.05;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${Math.random() > 0.5 ? 'var(--pink-300)' : 'var(--pink-200)'};
                border-radius: 50%;
                left: ${left}%;
                top: ${Math.random() * 100}%;
                opacity: ${opacity};
                animation: particleFloat ${duration}s ${delay}s ease-in-out infinite;
            `;
            particlesContainer.appendChild(particle);
        }
    };

    // Inject particle animation keyframes
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(20px, -30px) rotate(90deg); }
            50% { transform: translate(-15px, -60px) rotate(180deg); }
            75% { transform: translate(25px, -30px) rotate(270deg); }
        }
    `;
    document.head.appendChild(particleStyle);
    createParticles();

    // ---- Skill Progress Animation ----
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    const animateSkills = () => {
        if (skillsAnimated) return;

        const skillsSection = document.getElementById('skills');
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            skillBars.forEach((bar, index) => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, index * 150);
            });
            skillsAnimated = true;
        }
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills();

    // ---- Scroll Reveal ----
    const revealElements = () => {
        const elements = document.querySelectorAll(
            '.section-header, .about-image-col, .about-content-col, .skill-card, .timeline-item, .education-card, .certificate-card, .contact-info, .contact-form'
        );

        elements.forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });

        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (top < windowHeight * 0.85) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealElements);
    setTimeout(revealElements, 100);

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Contact Form (Google Apps Script Integration) ----
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwHtNaKW9HynO1yUKpTX09tYK_96VAQibhDNnXmzkrp78brIF8FV6G4HXPy33BxcOp4/exec'; // ← Replace with your deployed Web App URL

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('formSubmit');
        const originalHTML = btn.innerHTML;

        // Get form values
        const formData = {
            name: document.getElementById('formName').value.trim(),
            email: document.getElementById('formEmail').value.trim(),
            subject: document.getElementById('formSubject').value.trim(),
            message: document.getElementById('formMessage').value.trim()
        };

        // Validate
        if (!formData.name || !formData.email || !formData.message) {
            btn.innerHTML = '<span>Please fill all required fields</span> <i class="fas fa-exclamation-circle"></i>';
            btn.style.background = 'linear-gradient(135deg, #ff9800, #ffa726)';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 2500);
            return;
        }

        // Loading state
        btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        btn.style.opacity = '0.8';

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.status === 'success') {
                // Success
                btn.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check-circle"></i>';
                btn.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
                btn.style.opacity = '1';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            } else {
                throw new Error(result.message || 'Something went wrong');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            btn.innerHTML = '<span>Failed! Try Again</span> <i class="fas fa-times-circle"></i>';
            btn.style.background = 'linear-gradient(135deg, #e53935, #ef5350)';
            btn.style.opacity = '1';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }
    });

    // ---- Stagger Animation for Cards ----
    const staggerElements = document.querySelectorAll('.skill-card, .education-card, .certificate-card');
    staggerElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // ---- Counter Animation for Experience Badge ----
    const animateCounter = () => {
        const badge = document.querySelector('.badge-number');
        if (!badge) return;

        const target = parseInt(badge.textContent);
        const aboutSection = document.getElementById('about');
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75 && !badge.dataset.animated) {
            badge.dataset.animated = 'true';
            let count = 0;
            const increment = () => {
                if (count < target) {
                    count++;
                    badge.textContent = count + '+';
                    requestAnimationFrame(increment);
                }
            };
            increment();
        }
    };

    window.addEventListener('scroll', animateCounter);

    // ---- Parallax Effect for Hero ----
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero-visual');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    console.log('%c✨ Priya Yadav Portfolio Loaded Successfully!', 'color: #FF6B8A; font-size: 14px; font-weight: bold;');
});
