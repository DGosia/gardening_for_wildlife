document.addEventListener("DOMContentLoaded", () => {
    // Highlight navigation link based on the current section in view
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");

    const highlightNav = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove("font-bold", "underline"));
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add("font-bold", "underline");
            }
        });
    };

    window.addEventListener("scroll", highlightNav);
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".form-section");

    sections.forEach(section => {
        section.addEventListener("mouseenter", () => {
            section.classList.add("bg-green-50", "shadow-xl", "scale-105", "transition-transform", "duration-300");
        });
        section.addEventListener("mouseleave", () => {
            section.classList.remove("bg-green-50", "shadow-xl", "scale-105", "transition-transform", "duration-300");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll(".accordion-title");

    faqItems.forEach(button => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;

            // Toggle the active class
            button.classList.toggle("active");

            // Expand or collapse the accordion content
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Collapse
            } else {
                // Close other open accordions
                document.querySelectorAll(".accordion-content").forEach(item => {
                    if (item !== content) {
                        item.style.maxHeight = null;
                        item.previousElementSibling.classList.remove("active");
                    }
                });

                content.style.maxHeight = content.scrollHeight + "px"; // Expand
            }
        });
    });
});

// Gallery scrolling

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".scrollable-gallery");
    const leftButton = document.getElementById("gallery-left");
    const rightButton = document.getElementById("gallery-right");
    const scrollAmount = 300; // Adjust for the amount of scrolling

    // Scroll left
    leftButton.addEventListener("click", () => {
        gallery.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
        });
    });

    // Scroll right
    rightButton.addEventListener("click", () => {
        gallery.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Lightbox functionality for gallery items
    const galleryItems = Array.from(document.querySelectorAll(".gallery-item")); // Convert to array for indexing
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDescription = document.getElementById("lightbox-description");
    const closeButton = document.getElementById("lightbox-close");
    const prevButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");

    let currentIndex = 0; // Track the current image index

    // Function to open the lightbox with a specific image
    const openLightbox = (index) => {
        currentIndex = index;
        const item = galleryItems[currentIndex];

        // Update lightbox content
        lightboxImage.src = item.src;
        lightboxTitle.textContent = item.dataset.title || "Untitled";
        lightboxDescription.textContent = item.dataset.description || "No description available.";

        // Show the lightbox
        lightbox.classList.remove("hidden");
    };

    // Function to close the lightbox
    const closeLightbox = () => {
        lightbox.classList.add("hidden");
    };

    // Function to show the next image
    const showNext = () => {
        currentIndex = (currentIndex + 1) % galleryItems.length; // Loop to the beginning
        openLightbox(currentIndex);
    };

    // Function to show the previous image
    const showPrev = () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length; // Loop to the end
        openLightbox(currentIndex);
    };

    // Attach click event listeners to each gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    // Attach event listeners to the lightbox controls
    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", showNext);
    prevButton.addEventListener("click", showPrev);

    // Close the lightbox when clicking outside the image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("hidden")) {
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "Escape") closeLightbox();
        }
    });
});
