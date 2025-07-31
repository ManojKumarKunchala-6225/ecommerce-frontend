console.log("E-Commerce Website Loaded");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

// Toggle mobile menu and hamburger animation
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");
});
