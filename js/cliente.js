const menuItems = document.querySelectorAll(".cliente-sidebar li[data-section]");
const sections = document.querySelectorAll(".cliente-section");

const setActiveMenuItem = (targetSection) => {
    menuItems.forEach(item => {
        const isActive = item.getAttribute("data-section") === targetSection;
        item.classList.toggle("active", isActive);
    });
};

const initialSection = document.querySelector(".cliente-section.active")?.id || "dashboard";
setActiveMenuItem(initialSection);

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        const target = item.getAttribute("data-section");

        sections.forEach(sec => sec.classList.remove("active"));
        document.getElementById(target).classList.add("active");
        setActiveMenuItem(target);
    });
});
