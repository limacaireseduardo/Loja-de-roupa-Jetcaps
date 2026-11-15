const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
});

const sections = document.querySelectorAll("main section");
const links = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            links.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        }
    });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach((section) => observer.observe(section));

// Carrossel de bonés: cada clique desliza para o próximo
const carousel = document.getElementById("capCarousel");

if (carousel) {
    const slides = carousel.querySelectorAll(".hero-slide");
    let current = 0;

    function render() {
        slides.forEach((slide, i) => {
            const d = (i - current + slides.length) % slides.length;

            slide.classList.toggle("is-active", d === 0);
            slide.classList.toggle("is-prev", d === slides.length - 1);
        });

        carousel.setAttribute("aria-label", "Trocar boné. Atual: " + slides[current].alt);
    }

    carousel.addEventListener("click", () => {
        current = (current + 1) % slides.length;
        render();
    });

    render();
}

// Menu do celular (botão de 3 riscos)
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    function closeMenu() {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);
}