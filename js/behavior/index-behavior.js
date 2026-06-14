// Animacion contador
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };

    updateCount();
});

// Animacion al hacer scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

const carousel = document.querySelector(".carousel");

// Clonar contenido completo para loop infinito real
carousel.innerHTML += carousel.innerHTML;

let speed = 0.6;
let isPaused = false;

function infiniteScroll() {
    if (!isPaused) {
        carousel.scrollLeft += speed;

        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
            carousel.scrollLeft = 0;
        }
    }
    requestAnimationFrame(infiniteScroll);
}

infiniteScroll();

carousel.addEventListener("mouseenter", () => isPaused = true);
carousel.addEventListener("mouseleave", () => isPaused = false);

const observerwhy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".hidden").forEach(el => observerwhy.observe(el));

const observertes = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".hidden").forEach(el => observertes.observe(el));

const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatClose = document.getElementById("chatClose");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const quoteOpenBtn = document.getElementById("quoteOpenBtn");
const quoteSection = document.getElementById("cotizacion");
const quoteForm = document.getElementById("quoteForm");
const quoteMsg = document.getElementById("quoteMsg");
const feedbackOpenBtn = document.getElementById("feedbackOpenBtn");
const feedbackSection = document.getElementById("sugerencias-contacto");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackMsg = document.getElementById("feedbackMsg");
const feedbackCloseBtn = document.getElementById("feedbackCloseBtn");

const toggleChat = (open) => {
    chatBox.classList.toggle("open", open);
    chatBox.setAttribute("aria-hidden", String(!open));
};

chatToggle.addEventListener("click", () => {
    toggleChat(!chatBox.classList.contains("open"));
});

chatClose.addEventListener("click", () => toggleChat(false));

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    const userBubble = document.createElement("div");
    userBubble.className = "chat-message user";
    userBubble.textContent = message;
    chatMessages.appendChild(userBubble);

    const botBubble = document.createElement("div");
    botBubble.className = "chat-message bot";
    botBubble.textContent = "Gracias. Un asesor te respondera pronto. Tambien puedes ir a Cotizar ahora.";
    chatMessages.appendChild(botBubble);

    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = "";
});

quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    quoteMsg.textContent = "Solicitud enviada. Un asesor de Calcifer 3D te contactara pronto.";
    setTimeout(() => {
        quoteForm.reset();
        quoteMsg.textContent = "";
        quoteSection.classList.remove("open");
        quoteSection.setAttribute("aria-hidden", "true");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
});

quoteOpenBtn.addEventListener("click", (event) => {
    event.preventDefault();
    quoteSection.classList.add("open");
    quoteSection.setAttribute("aria-hidden", "false");
    quoteSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

feedbackOpenBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const willOpen = !feedbackSection.classList.contains("open");
    feedbackSection.classList.toggle("open", willOpen);
    feedbackSection.setAttribute("aria-hidden", String(!willOpen));

    if (willOpen) {
        feedbackSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
});

feedbackCloseBtn.addEventListener("click", () => {
    feedbackSection.classList.remove("open");
    feedbackSection.setAttribute("aria-hidden", "true");
});

feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    feedbackMsg.textContent = "Mensaje enviado. Gracias por ayudarnos a mejorar Calcifer 3D.";
    setTimeout(() => {
        feedbackForm.reset();
        feedbackMsg.textContent = "";
        feedbackSection.classList.remove("open");
        feedbackSection.setAttribute("aria-hidden", "true");
    }, 1300);
});
