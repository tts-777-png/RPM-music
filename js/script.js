const menuToggle = document.querySelector("[data-menu-toggle]");
const menuPanel = document.querySelector("[data-menu]");
const backToTop = document.getElementById("backToTop");

function setMenuState(isOpen) {
    if (!menuPanel || !menuToggle) {
        return;
    }

    menuPanel.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.classList.toggle("overflow-hidden", isOpen);
}

if (menuToggle && menuPanel) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuPanel.classList.contains("is-open");
        setMenuState(!isOpen);
    });

    document.querySelectorAll("[data-nav-link]").forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });
}

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

window.addEventListener("scroll", () => {
    if (!backToTop) {
        return;
    }

    backToTop.classList.toggle("is-visible", window.scrollY > 360);
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((element) => {
    revealObserver.observe(element);
});

const videoObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const iframe = entry.target.querySelector("iframe");

            if (!iframe || !iframe.contentWindow) {
                return;
            }

            const command = entry.isIntersecting ? "playVideo" : "pauseVideo";

            iframe.contentWindow.postMessage(
                `{"event":"command","func":"${command}","args":""}`,
                "*"
            );
        });
    },
    { threshold: 0.6 }
);

document.querySelectorAll(".video-container").forEach((container) => {
    videoObserver.observe(container);
});
