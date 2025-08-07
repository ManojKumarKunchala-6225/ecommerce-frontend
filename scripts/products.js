// scripts/products.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = `<div class="loading-spinner"><div class="spinner"></div><p>Loading products...</p></div>`;

  fetch("https://fakestoreapi.com/products")
    .then(res => {
      if (!res.ok) throw new Error("API Error");
      return res.json();
    })
    .then(products => {
      grid.innerHTML = "";
      products.forEach(product => {
        const { id, title, price, image } = product;
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
          <a href="product.html?id=${id}">
            <img src="${image}" alt="${title}" loading="lazy">
          </a>
          <h3>${title.length > 40 ? title.slice(0, 40) + "..." : title}</h3>
          <p>₹ ${price.toFixed(2)}</p>
          <button onclick="window.location.href='product.html?id=${id}'">View Details</button>
        `;
        grid.appendChild(card);
      });
    })
    .catch(err => {
      grid.innerHTML = `<p style="color: red;">Failed to load products.</p>`;
      console.error("Products fetch error:", err);
    });
});
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  if (!cartCountElement) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartCountElement.textContent = totalQuantity;
}
updateCartCount();