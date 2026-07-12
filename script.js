document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE MENU (HAMBURGER)
       ========================================================================== */
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            navbar.classList.toggle('open');
        });

        // Close menu when clicking a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                navbar.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       THEME TOGGLE (DARK / LIGHT)
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');

    // Check if user has saved a theme preference, otherwise check system preferences, otherwise default to light
    const getSavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return userPrefersDark ? 'dark' : 'light';
    };

    // Apply the theme
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Initialize theme
    const currentTheme = getSavedTheme();
    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }

    /* ==========================================================================
       TYPING EFFECT (HERO)
       ========================================================================== */
    const typedTextElement = document.getElementById('typed-text');
    const words = ["B.Tech IT Student", "Full Stack Developer", "Cybersecurity Enthusiast", "Vibe coder"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
        if (!typedTextElement) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Word completed typing
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1500; // Pause at end of word
            isDeleting = true;
        }
        // Word completely deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    };

    // Start typing effect
    if (typedTextElement) {
        setTimeout(typeEffect, 1000);
    }

    /* ==========================================================================
       ACTIVE NAVBAR LINK ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section');

    const activeNavLinkOnScroll = () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + 20);
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.navbar a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.navbar a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', activeNavLinkOnScroll);

    /* ==========================================================================
       SCROLL-TO-TOP BUTTON
       ========================================================================== */
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once it is revealed, we can unobserve
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    });

    const elementsToReveal = document.querySelectorAll('.scroll-reveal');
    elementsToReveal.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       SKILL PROGRESS BARS FILL (INTERSECTION OBSERVER)
       ========================================================================== */
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    if (skillsSection && skillBars.length > 0) {
        const fillSkillsCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        // The CSS width is defined inline or in style, we read the inline style's width we configured in HTML
                        // Actually, we set width: 0 initially in CSS, and inline style has width: XX% which will trigger transition
                        const targetWidth = bar.getAttribute('style');
                        // In case we reset the width: 0, we can just apply the inline style directly or toggle a class
                        // Since we set style="width: XX%" in HTML, we will remove style="width: 0%" and set back original
                        // Actually, we wrote in HTML: style="width: 95%" but in CSS we set .skill-bar-fill { width: 0; }
                        // Wait, inline styles override external CSS!
                        // To make it animate, we can set width to 0% in JS first, then set it to the target in observer!
                    });
                    observer.unobserve(entry.target);
                }
            });
        };

        // Initialize all skill bars to 0% width first in JS so they animate when revealed
        skillBars.forEach(bar => {
            const target = bar.style.width;
            bar.style.width = '0%';
            // Save target width in dataset
            bar.dataset.targetWidth = target;
        });

        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        bar.style.width = bar.dataset.targetWidth;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillObserver.observe(skillsSection);
    }

    /* ==========================================================================
       INTERACTIVE CONTACT FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Disable submit button and show loading state
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalBtnHTML = submitBtn.innerHTML;
            
            // Retrieve field values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Form validation
            if (!name || !email || !subject || !message) {
                formMessage.textContent = 'All fields are required.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>';

            // Access Web3Forms API Key from environment variables
            let accessKey = typeof window !== 'undefined' && window.APP_CONFIG && window.APP_CONFIG.VITE_WEB3FORMS_ACCESS_KEY
                ? window.APP_CONFIG.VITE_WEB3FORMS_ACCESS_KEY
                : (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
                    ? import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
                    : '');

            // Fallback for static file loading: fetch the local .env file dynamically
            if (!accessKey) {
                try {
                    const envResponse = await fetch('.env');
                    const envText = await envResponse.text();
                    const match = envText.match(/VITE_WEB3FORMS_ACCESS_KEY\s*=\s*([^\s#]+)/);
                    if (match && match[1]) {
                        accessKey = match[1].trim();
                    }
                } catch (e) {
                    // Fail silently and proceed to show the config error
                }
            }

            if (!accessKey) {
                formMessage.textContent = 'Access Key configuration error.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                return;
            }

            try {
                // Post details to Web3Forms API
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: accessKey,
                        name: name,
                        email: email,
                        subject: subject,
                        "Form Subject": subject,
                        message: message
                    })
                });

                const result = await response.json();

                if (result.success) {
                    // Success response
                    formMessage.textContent = 'Thank you, your message has been sent successfully!';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    contactForm.reset();
                } else {
                    // Error response from API
                    formMessage.textContent = result.message || 'Something went wrong. Please try again.';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                }
            } catch (error) {
                // Network or fetch failed error
                formMessage.textContent = 'Failed to submit form. Please check your network connection.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;

                // Hide status message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
});
