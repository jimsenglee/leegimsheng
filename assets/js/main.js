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
sr.reveal('.marquee__card, .services__card', { interval: 100 })
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

/*=============== INFINITE MARQUEE - FILL VIEWPORT ===============*/
function initMarquee() {
    const track = document.querySelector('.marquee__track');
    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.marquee__card'));
    if (cards.length === 0) return;

    // Get dimensions
    const cardWidth = cards[0].offsetWidth;
    const gap = 16; // 1rem gap
    const viewportWidth = window.innerWidth;

    // Calculate how many times we need to duplicate to fill 3x viewport
    const totalCardWidth = cardWidth + gap;
    const cardsNeededToFill = Math.ceil((viewportWidth * 3) / totalCardWidth);
    const clonesNeeded = Math.max(cardsNeededToFill - cards.length, cards.length * 2);

    // Remove existing clones (if resizing)
    track.querySelectorAll('.marquee__card--clone').forEach(clone => clone.remove());

    // Clone cards to fill the space
    for (let i = 0; i < clonesNeeded; i++) {
        const clone = cards[i % cards.length].cloneNode(true);
        clone.classList.add('marquee__card--clone');
        track.appendChild(clone);
    }

    // Calculate animation distance (half the total width for seamless loop)
    const allCards = track.querySelectorAll('.marquee__card');
    const halfLength = Math.floor(allCards.length / 2);
    const animationDistance = halfLength * totalCardWidth;

    // Set CSS custom property for animation
    track.style.setProperty('--scroll-distance', `-${animationDistance}px`);

    // Calculate animation duration based on speed (pixels per second)
    const speed = 50; // pixels per second
    const duration = animationDistance / speed;
    track.style.setProperty('--scroll-duration', `${duration}s`);
}

// Initialize on load and resize
window.addEventListener('load', initMarquee);
window.addEventListener('resize', () => {
    clearTimeout(window.marqueeResizeTimer);
    window.marqueeResizeTimer = setTimeout(initMarquee, 250);
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