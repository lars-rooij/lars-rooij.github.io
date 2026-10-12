/* =========================================================
   UNIVERSAL NAVIGATION
   Edit ONLY this list to change the menu everywhere.
   ========================================================= */

const navigationLinks = [
    {
        title: "Home",
        url: "index.html"
    },
    {
        title: "Artifical Creatures",
        url: "courses/ArtificCreatures.html"
    },
    {
        title: "Collaborative & Multimodal Interaction",
        url: "courses/Collab_and_Multimodal.html"
    },
    {
        title: "Creative Computation",
        url: "courses/CreaComp.html"
    },
    {
        title: "Physical Computing",
        url: "courses/PhysComp.html"
    },
    {
        title: "Prototyping",
        url: "courses/Prototyping.html"
    },
    {
        title: "Strategies in Creative Arts",
        url: "courses/Strategies.html"
    },
    {
        title: "Tangible & Playfull Research",
        url: "courses/Tang_and_Play.html"
    }
];


function getNavigationPath(url) {
    const currentPath = window.location.pathname;

    if (currentPath.includes("/assignments/") || currentPath.includes("/courses/")) {
        return "../" + url;
    }

    return url;
}

function createNavigation() {
    const quickLinks = document.getElementById("quick-links");

    if (!quickLinks) {
        console.error("Could not find #quick-links");
        return;
    }

    quickLinks.innerHTML = "";

    navigationLinks.forEach(item => {
        const link = document.createElement("a");

        link.href = getNavigationPath(item.url);
        link.textContent = item.title;

        quickLinks.appendChild(link);
    });
}

function setupDropdown() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector(".dropdown-toggle");

        if (!button) return;

        button.addEventListener("click", () => {
            const isOpen = dropdown.classList.toggle("open");

            button.setAttribute("aria-expanded", isOpen);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    createNavigation();
    setupDropdown();

    const categoryFilter = document.getElementById("category-filter");
    const galleryImages = document.querySelectorAll(".image-grid img");

    if (categoryFilter) {
        categoryFilter.addEventListener("change", function () {
            const selectedTag = this.value;

            galleryImages.forEach(image => {
                const tags = (image.dataset.category || "").split(" ");

                image.style.display =
                    selectedTag === "all" || tags.includes(selectedTag)
                        ? ""
                        : "none";
            });
        });
    }
});