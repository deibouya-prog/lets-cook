
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

function closeMenu() {
    navigation.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
});

document.querySelectorAll("#navigation a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

document.getElementById("year").textContent =
    new Date().getFullYear();
