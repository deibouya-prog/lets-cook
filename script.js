
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

// ==================================
// PREMIUM GALLERY LIGHTBOX
// ==================================

(() => {

    const items = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    const lightbox = document.getElementById(
        "galleryLightbox"
    );

    if (!lightbox || !items.length) return;

    const image = document.getElementById(
        "lightboxImage"
    );

    const counter = document.getElementById(
        "lightboxCounter"
    );

    let currentIndex = 0;
    let previousOverflow = "";

    function showImage(index) {

        currentIndex =
            (index + items.length) % items.length;

        const item = items[currentIndex];

        image.src = item.href;

        image.alt =
            item.querySelector("img")?.alt ||
            "Let's Cook culinary creation";

        counter.textContent =
            `${currentIndex + 1} / ${items.length}`;

    }

    function openGallery(index) {

        showImage(index);

        previousOverflow =
            document.body.style.overflow;

        lightbox.showModal();

        document.body.style.overflow = "hidden";

    }

    function closeGallery() {

        lightbox.close();

    }

    items.forEach((item, index) => {

        item.addEventListener("click", event => {

            event.preventDefault();

            openGallery(index);

        });

    });

    document.getElementById("lightboxClose")
        .addEventListener("click", closeGallery);

    document.getElementById("lightboxPrev")
        .addEventListener("click", () => {

            showImage(currentIndex - 1);

        });

    document.getElementById("lightboxNext")
        .addEventListener("click", () => {

            showImage(currentIndex + 1);

        });

    lightbox.addEventListener("close", () => {

        document.body.style.overflow =
            previousOverflow;

        items[currentIndex].focus();

    });

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeGallery();

        }

    });

    document.addEventListener("keydown", event => {

        if (!lightbox.open) return;

        if (event.key === "ArrowRight") {

            showImage(currentIndex + 1);

        }

        if (event.key === "ArrowLeft") {

            showImage(currentIndex - 1);

        }

    });

    // Mobile swipe navigation

    let touchStartX = 0;

    image.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });

    image.addEventListener("touchend", event => {

        const distance =
            event.changedTouches[0].screenX -
            touchStartX;

        if (distance < -50) {

            showImage(currentIndex + 1);

        }

        if (distance > 50) {

            showImage(currentIndex - 1);

        }

    }, { passive: true });

})();

// ========================================
// LET'S COOK — MENU CATEGORY FILTERING
// ========================================

(() => {

    const filters = document.querySelectorAll(".menu-filter");

    const products = document.querySelectorAll(
        ".menu-product-card"
    );

    const emptyMessage = document.getElementById("menuEmpty");

    // Only activate on the menu page

    if (!filters.length || !products.length) return;

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            const selectedCategory = filter.dataset.filter;

            // Update active category

            filters.forEach(button => {

                button.classList.remove("active");

                button.setAttribute("aria-pressed", "false");

            });

            filter.classList.add("active");

            filter.setAttribute("aria-pressed", "true");

            let visibleProducts = 0;

            // Filter food products

            products.forEach(product => {

                const matches =
                    selectedCategory === "all" ||
                    product.dataset.category === selectedCategory;

                product.hidden = !matches;

                if (matches) {

                    visibleProducts++;

                }

            });

            // Display message for empty categories

            if (emptyMessage) {

                emptyMessage.hidden = visibleProducts !== 0;

            }

        });

    });

})();
