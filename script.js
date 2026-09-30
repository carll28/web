const projectData = {
    mobileapp: ["mobileapp.png"],
    Canteen: ["Canteen Management System.png", "Canteen Management System2.png", "Canteen Management System3.png"],
    robot: ["robot.1.jpg", "robot.2.jpg", "robot.3.jpg"],
    studform: ["StudForm.java.png", "StudForm1.java.png"]
};

const projectNames = {
    mobileapp: "Mobile Application",
    Canteen: "Canteen Management System",
    robot: "2WD Smart Robot Car",
    studform: "StudForm.Java"
};

const cards = document.querySelectorAll(".card");
const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const modalImages = document.getElementById("modalImages");

/* Project modal */
cards.forEach(card => {
    card.addEventListener("click", () => {
        const projectKey = card.getAttribute("data-project");
        const images = projectData[projectKey] || [];
        const name = projectNames[projectKey] || projectKey;
        modalImages.innerHTML = "";
        images.forEach((src, i) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${name} screenshot ${i + 1}`;
            modalImages.appendChild(img);
        });
        modal.classList.add("show");
    });
});

closeModal.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
});
document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.classList.remove("show");
});

/* Hero entrance */
window.addEventListener("load", () => {
    const left = document.querySelector(".hero-left");
    const right = document.querySelector(".hero-right");
    const image = document.querySelector(".profile-img");
    setTimeout(() => left.classList.add("show"), 1400);
    setTimeout(() => { right.classList.add("show"); image.classList.add("show"); }, 1700);
});

/* Reveal on scroll */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add("active");
            // clear the stagger delay after the reveal so hover stays instant
            setTimeout(() => { el.style.transitionDelay = ""; }, 1500);
            revealObserver.unobserve(el);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* Project cards: staggered per row */
cards.forEach((card, i) => {
    card.style.transitionDelay = (i % 2) * 0.2 + "s";
    revealObserver.observe(card);
});

/* About + Skills cards: same effect (class added here, no HTML changes) */
document.querySelectorAll(".about-intro, .about-card, .skill-list li").forEach((el, i) => {
    el.classList.add("fx");
    el.style.transitionDelay = (i % 4) * 0.12 + "s";
    revealObserver.observe(el);
});

/* ONE effect for every card: 3D tilt + cursor spotlight
   (About, Skills, Projects, Contact form, Social card) */
document.querySelectorAll(".card, .fx, #contact form, .contact-social-card").forEach(box => {
    box.addEventListener("mousemove", e => {
        const r = box.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        box.classList.add("tilting");
        box.style.setProperty("--mx", x * 100 + "%");
        box.style.setProperty("--my", y * 100 + "%");
        box.style.setProperty("--ry", (x - 0.5) * 8 + "deg");
        box.style.setProperty("--rx", (0.5 - y) * 8 + "deg");
    });
    box.addEventListener("mouseleave", () => {
        box.classList.remove("tilting");
        box.style.setProperty("--rx", "0deg");
        box.style.setProperty("--ry", "0deg");
    });
});

/* About: wrap the photo so it can get the same rotating ring as Home */
const aboutPhoto = document.querySelector(".about-photo");
if (aboutPhoto) {
    const wrap = document.createElement("div");
    wrap.className = "about-photo-wrap";
    aboutPhoto.parentNode.insertBefore(wrap, aboutPhoto);
    wrap.appendChild(aboutPhoto);
}