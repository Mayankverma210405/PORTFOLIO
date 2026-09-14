const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
  if (!menuButton || !navLinks) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
  navLinks.classList.remove("is-open");
}

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const progress = document.querySelector(".scroll-progress");
let scrollScheduled = false;

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progress) progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  scrollScheduled = false;
}

window.addEventListener("scroll", () => {
  if (!scrollScheduled) {
    window.requestAnimationFrame(updateProgress);
    scrollScheduled = true;
  }
}, { passive: true });

updateProgress();

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  document.body.classList.add("has-motion");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}