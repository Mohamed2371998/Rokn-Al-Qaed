(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const scrollTop = document.querySelector(".scroll-top");

  const closeNav = () => {
    body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
    }
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.innerHTML = isOpen
        ? '<i class="bi bi-x-lg" aria-hidden="true"></i>'
        : '<i class="bi bi-list" aria-hidden="true"></i>';
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  const updateOnScroll = () => {
    const scrolled = window.scrollY > 24;
    if (header) header.classList.toggle("scrolled", scrolled);
    if (scrollTop) scrollTop.classList.toggle("visible", window.scrollY > 500);
  };

  updateOnScroll();
  window.addEventListener("scroll", updateOnScroll, { passive: true });

  if (scrollTop) {
    scrollTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const currentPage = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const href = decodeURIComponent(link.getAttribute("href") || "");
    if ((currentPage === "" || currentPage === "index.html") && href === "index.html") {
      link.classList.add("active");
    } else if (href && !href.startsWith("#") && href.split("#")[0] === currentPage) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");
      if (!selector || selector === "#") return;
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
