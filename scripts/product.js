// scripts/product.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productDetailContainer");
  const productId = new URLSearchParams(window.location.search).get("id");
  const apiURL = `https://fakestoreapi.com/products/${productId}`;

  const initImageZoom = (imgContainer, imgSrc) => {
    const img = imgContainer.querySelector("#product-image");

    // Mobile zoom
    const mobileTrigger = document.getElementById("mobile-zoom-trigger");
    const triggerMobileZoom = () => {
      if (window.innerWidth > 768 || document.querySelector(".zoom-popup")) return;

      const popup = document.createElement("div");
      popup.className = "zoom-popup";
      const popupImage = document.createElement("img");
      popupImage.src = imgSrc;
      const closeBtn = document.createElement("span");
      closeBtn.className = "close-zoom";
      closeBtn.innerHTML = "&times;";

      const closePopup = () => {
        if (document.body.contains(popup)) document.body.removeChild(popup);
      };

      closeBtn.addEventListener("click", closePopup);
      popup.addEventListener("click", (e) => {
        if (e.target === popup) closePopup();
      });

      popup.appendChild(closeBtn);
      popup.appendChild(popupImage);
      document.body.appendChild(popup);
      setTimeout(() => popup.classList.add("visible"), 10);
    };

    if (mobileTrigger) {
      mobileTrigger.addEventListener("click", triggerMobileZoom);
      img.addEventListener("click", triggerMobileZoom);
    }

    // Desktop zoom
    const lens = document.createElement("div");
    lens.className = "zoom-lens";
    imgContainer.appendChild(lens);

    const zoomFactor = 2;
    lens.style.backgroundImage = `url(${img.src})`;
    lens.style.backgroundSize = `${img.width * zoomFactor}px ${img.height * zoomFactor}px`;

    const moveLens = (e) => {
      const pos = img.getBoundingClientRect();
      let x = e.pageX - pos.left - window.scrollX;
      let y = e.pageY - pos.top - window.scrollY;

      x = Math.max(lens.offsetWidth / 2, Math.min(x, pos.width - lens.offsetWidth / 2));
      y = Math.max(lens.offsetHeight / 2, Math.min(y, pos.height - lens.offsetHeight / 2));

      lens.style.left = `${x - lens.offsetWidth / 2}px`;
      lens.style.top = `${y - lens.offsetHeight / 2}px`;

      const bgX = -((x * zoomFactor) - lens.offsetWidth / 2);
      const bgY = -((y * zoomFactor) - lens.offsetHeight / 2);
      lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
    };

    imgContainer.addEventListener("mousemove", (e) => {
      if (window.innerWidth <= 768) {
        lens.style.display = "none";
        return;
      }
      lens.style.display = "block";
      moveLens(e);
    });

    imgContainer.addEventListener("mouseleave", () => {
      lens.style.display = "none";
    });
  };

  const fetchProduct = async () => {
    try {
      container.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading product details...</p>
        </div>`;

      const res = await fetch(apiURL);
      if (!res.ok) throw new Error("API Error");

      const product = await res.json();
      const { title, price, description, image, category, rating } = product;

      container.innerHTML = `
        <div class="product-detail-container">
          <div class="product-detail-image">
            <div class="image-zoom-container">
              <img src="${image}" alt="${title}" id="product-image"/>
            </div>
            <button id="mobile-zoom-trigger" class="mobile-zoom-trigger">🔍 Tap to Zoom</button>
          </div>

          <div class="product-detail-info">
            <h2>${title}</h2>
            <p class="price" id="product-price">₹ ${price.toFixed(2)}</p>
            <p class="category">Category: ${category}</p>
            <p class="rating">Rating: ⭐ ${rating?.rate || "N/A"} (${rating?.count || 0} reviews)</p>

            <div class="variations-group">
              <div class="variations">
                <label for="color">Color</label>
                <select id="color">
                  <option value="black">Black</option>
                  <option value="blue">Blue</option>
                  <option value="red">Red</option>
                </select>
              </div>
              <div class="variations">
                <label for="size">Size</label>
                <select id="size">
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large (+₹20)</option>
                  <option value="XL">Extra Large (+₹50)</option>
                </select>
              </div>
            </div>

            <div class="quantity-section">
              <label for="quantity">Quantity</label>
              <div class="quantity-selector">
                <button id="decrease-quantity" class="quantity-btn">−</button>
                <input type="number" id="quantity" min="1" value="1" readonly>
                <button id="increase-quantity" class="quantity-btn">+</button>
              </div>
            </div>

            <button class="add-to-cart-btn">Add to Cart</button>
            <div id="success-message" class="success-message">✅ Added to Cart!</div>

            <div class="description">
              <p><strong>Description:</strong> ${description}</p>
            </div>
          </div>
        </div>
      `;

      const basePrice = price;
      const priceElement = document.getElementById("product-price");
      const quantityInput = document.getElementById("quantity");
      const decreaseBtn = document.getElementById("decrease-quantity");
      const increaseBtn = document.getElementById("increase-quantity");
      const colorSelector = document.getElementById("color");
      const sizeSelector = document.getElementById("size");

      const updateTotalPrice = () => {
        const quantity = parseInt(quantityInput.value);
        const selectedSize = sizeSelector.value;
        let currentPrice = basePrice;

        if (selectedSize === "L") currentPrice += 20;
        if (selectedSize === "XL") currentPrice += 50;

        priceElement.textContent = `₹ ${(currentPrice * quantity).toFixed(2)}`;
      };

      sizeSelector.addEventListener("change", updateTotalPrice);
      colorSelector.addEventListener("change", () => {
        const selectedColor = colorSelector.value;
        const largeOption = sizeSelector.querySelector('option[value="L"]');

        if (selectedColor === "red") {
          largeOption.disabled = true;
          largeOption.textContent = "Large (Out of Stock)";
          if (sizeSelector.value === "L") {
            sizeSelector.value = "M";
          }
        } else {
          largeOption.disabled = false;
          largeOption.textContent = "Large (+₹20)";
        }
        updateTotalPrice();
      });

      decreaseBtn.addEventListener("click", () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
          quantityInput.value = --quantity;
          updateTotalPrice();
        }
      });

      increaseBtn.addEventListener("click", () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity < 10) {
          quantityInput.value = ++quantity;
          updateTotalPrice();
        }
      });

      updateTotalPrice();

      const imgContainer = container.querySelector(".image-zoom-container");
      const productImg = imgContainer.querySelector("#product-image");

      productImg.onload = () => initImageZoom(imgContainer, product.image);
      if (productImg.complete) initImageZoom(imgContainer, product.image);

      container.querySelector(".add-to-cart-btn").addEventListener("click", () => {
        const selectedSize = sizeSelector.value;
        const selectedColor = colorSelector.value;
        const quantity = parseInt(quantityInput.value);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingIndex = cart.findIndex(
          (item) =>
            item.id === product.id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
        );

        if (existingIndex !== -1) {
          cart[existingIndex].quantity += quantity;
        } else {
          cart.push({ ...product, quantity, selectedSize, selectedColor });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.updateCartCount?.();

        const successMessage = document.getElementById("success-message");
        successMessage.classList.add("show");
        setTimeout(() => successMessage.classList.remove("show"), 2000);
      });
    } catch (err) {
      container.innerHTML = `<p style="color:red;">❌ Failed to load product details.</p>`;
      console.error("Product detail error:", err);
    }
  };

  if (productId) {
    fetchProduct();
  } else {
    container.innerHTML = `<p>❌ Invalid product ID in URL.</p>`;
  }
});
