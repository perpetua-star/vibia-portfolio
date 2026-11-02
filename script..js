// ==========================================
// 1. MOBILE NAVIGATION MENU
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");

        const isOpen = navbar.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }
    });
}


// Close mobile menu after clicking a navigation link

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navbar) {
            navbar.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });
});


// ==========================================
// 2. PRELOADER
// ==========================================

const preloader = document.getElementById("preloader");

function hidePreloader() {
    if (preloader) {
        preloader.classList.add("hide");

        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }
}

window.addEventListener("load", hidePreloader);

// Fallback in case the page takes too long to load
setTimeout(hidePreloader, 4000);


// ==========================================
// 3. SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ==========================================
// 4. ACTIVE NAVIGATION LINK
// ==========================================

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);


// ==========================================
// 5. BACK TO TOP BUTTON
// ==========================================

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ==========================================
// 6. AUTOMATIC COPYRIGHT YEAR
// ==========================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ==========================================
// 7. CONTACT FORM VALIDATION
// ==========================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Replace this with your actual email address
const CONTACT_EMAIL = "your@email.com";

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = contactForm.elements.namedItem("name")?.value.trim();
        const email = contactForm.elements.namedItem("email")?.value.trim();
        const subject = contactForm.elements.namedItem("subject")?.value.trim();
        const message = contactForm.elements.namedItem("message")?.value.trim();

        if (!name || !email || !subject || !message) {
            showFormMessage(
                "Please complete all the fields.",
                "error"
            );
            return;
        }

        // Check whether the email address is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showFormMessage(
                "Please enter a valid email address.",
                "error"
            );
            return;
        }

        // Prepare an email using the visitor's email application
        const mailSubject = encodeURIComponent(subject);
        const mailBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        const mailtoLink =
            `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

        showFormMessage(
            "Opening your email application...",
            "success"
        );

        window.location.href = mailtoLink;
    });
}


// Display contact form messages

function showFormMessage(message, type) {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
}


// ==========================================
// 8. NAVBAR SCROLL EFFECT
// ==========================================

const header = document.querySelector(".header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}


// ==========================================
// 9. UPDATE PAGE YEAR AND NAVIGATION
// ==========================================

updateActiveLink();

console.log("Portfolio website JavaScript loaded successfully!");