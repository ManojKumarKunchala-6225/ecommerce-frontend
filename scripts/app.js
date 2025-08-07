import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase.js";
const loginButton = document.getElementById('login-btn');
const profileButton = document.getElementById('profile-btn');
const logoutButton = document.getElementById('logout-btn'); // Find the new button
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        if (loginButton) loginButton.style.display = 'none';
        if (profileButton) profileButton.style.display = 'block';
    } else {
        // User is signed out
        if (loginButton) loginButton.style.display = 'block';
        if (profileButton) profileButton.style.display = 'none';
    }
});
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            alert("You have been successfully logged out.");
            window.location.href = 'index.html'; // Redirect to the homepage
        }).catch((error) => {
            // An error happened.
            console.error('Sign Out Error', error);
        });
    });
}


export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
  }
}

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});
