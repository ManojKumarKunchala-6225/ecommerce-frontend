// scripts/app.js - Common script for all pages

/**
 * Creates a global function to update the cart count in the navbar.
 * This can be called from any script to ensure the UI is always in sync.
 */
window.updateCartCount = function() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Calculate total quantity of all items in the cart, not just the number of entries
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBadge = document.getElementById("cart-count");
  
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    // Show the badge only if there are items in the cart
    cartBadge.style.display = totalItems > 0 ? "block" : "none";
  }
};

// A flag to ensure the hamburger menu logic is only attached once per session
let isNavInitialized = false;

/**
 * Initializes all shared page features. This function is designed to run
 * every time a page is displayed, including when using the browser's
 * back and forward buttons.
 */
function initializePage() {
  // Always update the cart count whenever a page is shown to the user
  window.updateCartCount();

  // The hamburger menu's click listener only needs to be set up once.
  // This check prevents adding multiple listeners to the same element.
  if (!isNavInitialized) {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
      isNavInitialized = true;
    }
  }
}

// Use the 'pageshow' event, which is more reliable than 'DOMContentLoaded'
// for handling all types of page navigation, including back/forward actions.
window.addEventListener('pageshow', initializePage);
