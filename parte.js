// JS optimizado y documentado para navegación / header / sección activa
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("navMenu");
  const header = document.querySelector(".site-header");
  const links = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section[id]");

  // Toggle menú móvil (agrega clase .open)
  const toggleMenu = () => {
    btn.classList.toggle("open");
    nav.classList.toggle("open");
    const expanded = btn.classList.contains("open");
    btn.setAttribute("aria-expanded", expanded);
    nav.setAttribute("aria-hidden", !expanded);
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      btn.classList.remove("open");
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      nav.setAttribute("aria-hidden", "true");
    }
  });

  // Cerrar menú con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      btn.classList.remove("open");
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      nav.setAttribute("aria-hidden", "true");
    }
  });

  // Efecto header al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  // Resaltar sección activa (usando IntersectionObserver para rendimiento)
  const observerOptions = { root: null, rootMargin: "-15% 0px -45% 0px", threshold: 0 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav a[href="#${id}"]`);
      if (link) link.classList.toggle("active", entry.isIntersecting);
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
