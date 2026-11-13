const menuBtn = document.getElementById("menu-btn");
const sidebarEl = document.getElementById("nav-bar");
const backdropEl = document.getElementById("sidebar-backdrop");
const navItemsEl = document.querySelectorAll(".nav-items");
const mobileViewport = window.matchMedia("(width < 800px)");

// Sidebar mobile: event handlers
syncSidebarAccessibility();
menuBtn.addEventListener("click", toggleSidebar);
backdropEl.addEventListener("click", closeSidebar);
mobileViewport.addEventListener("change", syncSidebarAccessibility);
navItemsEl.forEach((item) => {
    item.addEventListener("click", closeSidebar);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("sidebar-open")) {
        closeSidebar();
        menuBtn.focus();
    }
});

// Sidebar mobile: state and accessibility
function toggleSidebar() {
    const isOpen = document.body.classList.toggle("sidebar-open");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );
    syncSidebarAccessibility();
}

function closeSidebar() {
    document.body.classList.remove("sidebar-open");
    menuBtn.setAttribute("aria-expanded", false);
    menuBtn.setAttribute("aria-label", "Open menu");
    syncSidebarAccessibility();
}

function syncSidebarAccessibility() {
    const isHidden = mobileViewport.matches
        && !document.body.classList.contains("sidebar-open");

    sidebarEl.setAttribute("aria-hidden", isHidden);
    sidebarEl.inert = isHidden;
}