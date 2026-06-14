const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navLinks");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

const carousel = document.getElementById("servicesCarousel");
const prevBtn = document.getElementById("servicePrev");
const nextBtn = document.getElementById("serviceNext");
const dots = document.querySelectorAll("#serviceDots .dot");

if (carousel && prevBtn && nextBtn && dots.length) {
    const getStep = () => {
        const firstCard = carousel.querySelector(".service-card");
        if (!firstCard) return carousel.clientWidth;
        const gap = parseFloat(getComputedStyle(carousel).gap) || 0;
        return firstCard.getBoundingClientRect().width + gap;
    };

    const maxIndex = dots.length - 1;
    let currentIndex = 0;

    const setActiveDot = (index) => {
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === index);
        });
    };

    const goToIndex = (index) => {
        const step = getStep();
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        carousel.scrollTo({ left: currentIndex * step, behavior: "smooth" });
        setActiveDot(currentIndex);
    };

    prevBtn.addEventListener("click", () => {
        goToIndex(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
        goToIndex(currentIndex + 1 > maxIndex ? 0 : currentIndex + 1);
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            goToIndex(Number(dot.dataset.index));
        });
    });

    carousel.addEventListener("scroll", () => {
        const step = getStep();
        const index = Math.round(carousel.scrollLeft / step);
        if (index !== currentIndex) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            setActiveDot(currentIndex);
        }
    });

    let autoPlay = setInterval(() => {
        goToIndex(currentIndex + 1 > maxIndex ? 0 : currentIndex + 1);
    }, 4500);

    const stopAutoPlay = () => clearInterval(autoPlay);
    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlay = setInterval(() => {
            goToIndex(currentIndex + 1 > maxIndex ? 0 : currentIndex + 1);
        }, 4500);
    };

    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
    prevBtn.addEventListener("mouseenter", stopAutoPlay);
    nextBtn.addEventListener("mouseenter", stopAutoPlay);
    prevBtn.addEventListener("mouseleave", startAutoPlay);
    nextBtn.addEventListener("mouseleave", startAutoPlay);

    window.addEventListener("resize", () => goToIndex(currentIndex));
}
