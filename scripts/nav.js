// scripts/nav.js

// Toggle mobile menu
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (nav) nav.classList.toggle("active");
}

document.getElementById("hamburger")?.addEventListener("click", toggleMenu);

// ✅ Update cart count on navbar
function updateCartCount() {
  const cartCountEl = document.querySelector(".cart-count");
  if (!cartCountEl) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCountEl.textContent = totalItems;
}

// Run it when DOM is loaded
document.addEventListener("DOMContentLoaded", updateCartCount);
