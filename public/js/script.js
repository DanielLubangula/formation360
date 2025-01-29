document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("inscriptionForm");
  const burgerMenu = document.querySelector(".burger-menu");
  const navWrapper = document.querySelector(".nav-wrapper");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Mobile Menu Toggle
  if (burgerMenu) {
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("active");
      navWrapper.classList.toggle("show-nav");
    });
  }
  // Dropdown Toggle for Mobile
  dropdowns.forEach((dropdown) => {
    const dropdownLink = dropdown.querySelector("a");
    dropdownLink.addEventListener("click", (e) => {
      // Prevent default link behavior
      e.preventDefault();

      // Toggle dropdown active state
      dropdown.classList.toggle("active");
    });
  });

  // Smooth Scrolling for Navigation Links
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="/home#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").split("#")[1];
        if (window.location.pathname !== "/home") {
          window.location.href = `/home#${targetId}`;
        } else {
          document
            .getElementById(targetId)
            ?.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  });

  // Auto-scroll to Inscription on Page Load
  // Auto-scroll uniquement si l'URL ne contient pas une autre ancre
  window.addEventListener("load", () => {
    const hash = window.location.hash; // Récupère l'ancre de l'URL
    if (!hash) {
      // Vérifie s'il n'y a PAS d'ancre
      const inscriptionSection = document.getElementById("inscription");
      if (inscriptionSection)
        inscriptionSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});
