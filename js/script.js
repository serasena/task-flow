const menuBtn = document.getElementById("menu-btn");
const sidebarEl = document.getElementById("nav-bar");
const backdropEl = document.getElementById("sidebar-backdrop");
const navItemsEl = document.querySelectorAll(".nav-items");

// Open/Close Sidebar 'Mobile'
menuBtn.addEventListener("click", toggleSidebar);

backdropEl.addEventListener("click", closeSidebar);

navItemsEl.forEach((item) => {
    item.addEventListener("click", closeSidebar);
});

function toggleSidebar() {
    const isOpen = document.body.classList.toggle("sidebar-open");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );
}

function closeSidebar() {
    document.body.classList.remove("sidebar-open");
    menuBtn.setAttribute("aria-expanded", false);
    menuBtn.setAttribute("aria-label", "Abrir menu");
}