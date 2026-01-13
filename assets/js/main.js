/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('blur-header')
        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== EMAIL JS ===============*/
const conatctForm = document.getElementById("contact-form");
const conatctMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
    e.preventDefault();

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_45bxu1v', 'template_f1utjfu', '#contact-form', 'eXMgMjWpp0jVEYEUk')
        .then(() => {
            //Show sent message
            conatctMessage.textContent = "Message sent successfully ✅"

            // Remove message after five seconds
            setTimeout(() => {
                conatctMessage.textContent = ''
            }, 5000)

            // Clear input fields
            conatctForm.reset()
        }, () => {
            conatctMessage.textContent = "Message not sent (service error) ❌"
        })
}

conatctForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true //Animations repeat
})

sr.reveal('.home__data, .experience, .skills, .contact__container')
sr.reveal('.home__img', { delay: 600 })
sr.reveal('.home__scroll', { delay: 800 })
sr.reveal('.services__card', { interval: 100 })
sr.reveal('.about__content', { origin: 'right' })
sr.reveal('.home__img', { origin: 'left' })

/*=============== TYPING ANIMATION ===============*/
const typingText = document.getElementById('typing-text');

if (typingText) {
    const words = ['Software Dev', 'Web Developer', 'IT Support', 'Flutter Dev', 'Full-Stack'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            // Deleting
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 300);
            } else {
                setTimeout(type, deleteSpeed);
            }
        } else {
            // Typing
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, pauseTime);
            } else {
                setTimeout(type, typeSpeed);
            }
        }
    }

    // Start typing
    setTimeout(type, 500);
}

/*=============== PARTICLES.JS BACKGROUND ===============*/
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ['#6366f1', '#818cf8', '#a5b4fc'] },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6366f1',
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.8 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

/*=============== DRAGGABLE MARQUEE WITH VELOCITY ===============*/
function initDraggableMarquee() {
    const track = document.querySelector('.marquee__track');
    const marquee = document.querySelector('.marquee');
    if (!track || !marquee) return;

    // Get only ORIGINAL cards
    const originalCards = Array.from(track.querySelectorAll('.marquee__card:not(.marquee__card--clone)'));
    if (originalCards.length === 0) return;

    // Remove existing clones
    track.querySelectorAll('.marquee__card--clone').forEach(clone => clone.remove());

    // Calculate dimensions
    const cardWidth = originalCards[0].offsetWidth;
    const gap = 16;
    const viewportWidth = window.innerWidth;
    const oneSetWidth = originalCards.length * (cardWidth + gap);
    const setsNeeded = Math.ceil((viewportWidth * 4) / oneSetWidth) + 1;

    // Clone cards
    for (let set = 0; set < setsNeeded; set++) {
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('marquee__card--clone');
            track.appendChild(clone);
        });
    }

    // Remove CSS animation - we'll use JS
    track.style.animation = 'none';

    // State
    let scrollPos = 0;
    let velocity = 0;
    let isDragging = false;
    let hasDragged = false; // Track if actual dragging occurred
    let startX = 0;
    let lastX = 0;
    let lastTime = 0;
    let isHoveringCard = false;
    let autoScrollSpeed = 0.8;
    const dragThreshold = 5; // Pixels moved to count as drag

    // Update position
    function updatePosition() {
        // Loop seamlessly
        if (scrollPos <= -oneSetWidth) {
            scrollPos += oneSetWidth;
        } else if (scrollPos > 0) {
            scrollPos -= oneSetWidth;
        }
        track.style.transform = `translateX(${scrollPos}px)`;
    }

    // Animation loop
    function animate() {
        if (!isDragging && !isHoveringCard) {
            // Auto-scroll when not interacting
            if (Math.abs(velocity) < 0.5) {
                velocity = -autoScrollSpeed;
            }
        }

        // Apply velocity with friction (momentum)
        if (!isDragging) {
            scrollPos += velocity;
            velocity *= 0.95; // Less friction = more momentum
        }

        updatePosition();
        requestAnimationFrame(animate);
    }

    // Prevent clicks on links after dragging
    track.querySelectorAll('.marquee__card a, .marquee__card').forEach(el => {
        el.addEventListener('click', (e) => {
            if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    });

    // Mouse events
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        hasDragged = false;
        startX = e.pageX;
        lastX = e.pageX;
        lastTime = Date.now();
        velocity = 0;
        track.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const dx = e.pageX - lastX;
        const totalMove = Math.abs(e.pageX - startX);

        // Mark as dragged if moved beyond threshold
        if (totalMove > dragThreshold) {
            hasDragged = true;
        }

        const dt = Date.now() - lastTime;

        scrollPos += dx;
        velocity = dx / Math.max(dt, 1) * 20; // Higher multiplier for more momentum

        lastX = e.pageX;
        lastTime = Date.now();

        updatePosition();
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            track.style.cursor = 'grab';

            // Reset hasDragged after a short delay to allow click prevention
            setTimeout(() => {
                hasDragged = false;
            }, 100);
        }
    });

    // Touch events
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        hasDragged = false;
        startX = e.touches[0].pageX;
        lastX = e.touches[0].pageX;
        lastTime = Date.now();
        velocity = 0;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const dx = e.touches[0].pageX - lastX;
        const totalMove = Math.abs(e.touches[0].pageX - startX);

        if (totalMove > dragThreshold) {
            hasDragged = true;
        }

        const dt = Date.now() - lastTime;

        scrollPos += dx;
        velocity = dx / Math.max(dt, 1) * 20;

        lastX = e.touches[0].pageX;
        lastTime = Date.now();

        updatePosition();
    }, { passive: true });

    track.addEventListener('touchend', () => {
        isDragging = false;
        setTimeout(() => {
            hasDragged = false;
        }, 100);
    });

    // Card-only hover pause
    track.querySelectorAll('.marquee__card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!isDragging) {
                isHoveringCard = true;
                velocity = 0;
            }
        });
        card.addEventListener('mouseleave', () => {
            isHoveringCard = false;
        });
    });

    // Set initial cursor
    track.style.cursor = 'grab';

    // Start animation
    animate();
}

// Initialize
document.addEventListener('DOMContentLoaded', initDraggableMarquee);
window.addEventListener('load', initDraggableMarquee);
window.addEventListener('resize', () => {
    clearTimeout(window.marqueeResizeTimer);
    window.marqueeResizeTimer = setTimeout(initDraggableMarquee, 250);
});

/*=============== CONTACT FORM SUBMISSION ===============*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.contact__button');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        try {
            const formData = new FormData(contactForm);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Success message
                contactMessage.textContent = '✅ Message sent successfully!';
                contactMessage.style.color = '#4ade80';
                contactMessage.style.display = 'block';

                // Clear form
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    contactMessage.style.display = 'none';
                }, 5000);
            } else {
                // Error message
                contactMessage.textContent = '❌ Failed to send. Please try again.';
                contactMessage.style.color = '#f87171';
                contactMessage.style.display = 'block';
            }
        } catch (error) {
            contactMessage.textContent = '❌ Network error. Please try again.';
            contactMessage.style.color = '#f87171';
            contactMessage.style.display = 'block';
        }

        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    });
}