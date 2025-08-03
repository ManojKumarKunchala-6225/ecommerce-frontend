// scripts/nav.js
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (nav) nav.classList.toggle("active");
}

document.getElementById("hamburger")?.addEventListener("click", toggleMenu);
