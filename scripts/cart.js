document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");
  const cartCountEl = document.querySelector(".cart-count");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) {
      cartCountEl.textContent = count;
    }
  }

  function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceEl.textContent = `₹${total.toFixed(2)}`;
    checkoutBtn.disabled = cart.length === 0;
  }

  function renderCartItems() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
      updateCartCount();
      updateTotalPrice();
      return;
    }

    cart.forEach((item, index) => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-img" />
        <div class="details">
          <h3>${item.title}</h3>
          <p>₹${item.price.toFixed(2)}</p>
          <div class="quantity-controls">
            <button class="decrease">−</button>
            <span>${item.quantity}</span>
            <button class="increase">+</button>
          </div>
          <div class='centerbutton'>
          <button class="remove-btn">Remove</button>
          </div>
        </div>
      `;

      // Quantity +/− Buttons
      itemEl.querySelector(".increase").addEventListener("click", () => {
        cart[index].quantity++;
        saveAndRender();
      });

      itemEl.querySelector(".decrease").addEventListener("click", () => {
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        saveAndRender();
      });

      itemEl.querySelector(".remove-btn").addEventListener("click", () => {
        cart.splice(index, 1);
        saveAndRender();
      });

      cartContainer.appendChild(itemEl);
    });

    updateCartCount();
    updateTotalPrice();
  }

  function saveAndRender() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
  }

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    window.location.href = "checkout.html"; // Link to real checkout later
  });

  // Initial render
  renderCartItems();
});
