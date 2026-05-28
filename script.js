// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for internal navigation links (About, Projects, Skills, Contact)
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Active nav link based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const navMap = {};

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      navMap[href] = link;
    }
  });

  const setActiveNav = () => {
    let currentId = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // Section is "active" when its top is within the top 40% of the viewport
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom > 0) {
        currentId = `#${section.id}`;
      }
    });

    // Clear all active states
    Object.values(navMap).forEach((link) =>
      link.classList.remove("nav-link-active")
    );

    // Apply active state to the current section's nav link
    if (currentId && navMap[currentId]) {
      navMap[currentId].classList.add("nav-link-active");
    }
  };

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav(); // Run once on load
});
