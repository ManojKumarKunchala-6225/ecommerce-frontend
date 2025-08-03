document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");
  const dataSource = "https://fakestoreapi.com/products";

  const loadProducts = async () => {
    try {
      // Show loading spinner
      grid.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading products...</p>
        </div>
      `;

      // Check localStorage cache (5 min)
      const cached = localStorage.getItem("cachedProducts");
      const cachedTime = localStorage.getItem("cachedTime");
      const isFresh = cached && cachedTime && Date.now() - cachedTime < 5 * 60 * 1000;

      const products = isFresh
        ? JSON.parse(cached)
        : await fetch(dataSource).then((res) => res.json());

      if (!isFresh) {
        localStorage.setItem("cachedProducts", JSON.stringify(products));
        localStorage.setItem("cachedTime", Date.now());
      }

      grid.innerHTML = "";

      products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const title = product.title;
        const price = product.price;
        const image = product.image;

        card.innerHTML = `
          <div class="image-wrapper">
            <img src="${image}" alt="${title}" loading="lazy">
          </div>
          <h3>${title.length > 40 ? title.slice(0, 40) + "..." : title}</h3>
          <p>₹ ${price}</p>
          <button class="add-to-cart-btn">Add to Cart</button>
        `;

        grid.appendChild(card);

        card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
          alert(`✅ "${title}" added to cart!`);
        });
      });
    } catch (err) {
      grid.innerHTML = `<p style="color: red;">❌ Failed to load products. Please try again later.</p>`;
      console.error("Data fetch error:", err);
    }
  };

  if (grid) {
    loadProducts();
  }
});
