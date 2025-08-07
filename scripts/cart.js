document.addEventListener("DOMContentLoaded", () => {
  const t = document.getElementById("cart-items"),
    n = document.getElementById("total-price"),
    e = document.getElementById("checkout-btn"),
    c = document.querySelector(".cart-count");
  let i = JSON.parse(localStorage.getItem("cart")) || [];
  function o() {
    const t = i.reduce((t, n) => t + n.quantity, 0);
    c && (c.textContent = t);
  }
  function a() {
    const t = i.reduce((t, n) => t + n.price * n.quantity, 0);
    (n.textContent = "₹" + t.toFixed(2)), (e.disabled = 0 === i.length);
  }
  function r() {
    if (((t.innerHTML = ""), 0 === i.length))
      return (
        (t.innerHTML = '<p class="empty-cart">Your cart is empty.</p>'),
        o(),
        void a()
      );
    i.forEach((n, e) => {
      const c = document.createElement("div");
      (c.className = "cart-item"),
        (c.innerHTML = `\n        <img \n          src="${
          n.image
        }"\n          alt="${
          n.title
        }"\n          class="cart-item-img"\n        />\n        <div \n          class="details"\n        >\n          <h3>\n            ${
          n.title
        }\n          </h3>\n          <p>\n            ₹${n.price.toFixed(
          2
        )}\n          </p>\n          <div \n            class="quantity-controls"\n          >\n            <button \n              class="decrease"\n            >−</button>\n            <span>\n              ${
          n.quantity
        }\n            </span>\n            <button \n              class="increase"\n            >+</button>\n          </div>\n          <div \n            class="centerbutton"\n          >\n            <button \n              class="remove-btn"\n            >Remove</button>\n          </div>\n        </div>\n      `),
        c.querySelector(".increase").addEventListener("click", () => {
          i[e].quantity++, s();
        }),
        c.querySelector(".decrease").addEventListener("click", () => {
          i[e].quantity > 1 ? i[e].quantity-- : i.splice(e, 1), s();
        }),
        c.querySelector(".remove-btn").addEventListener("click", () => {
          i.splice(e, 1), s();
        }),
        t.appendChild(c);
    }),
      o(),
      a();
  }
  function s() {
    localStorage.setItem("cart", JSON.stringify(i)), r();
  }
  e.addEventListener("click", () => {
    0 !== i.length && (window.location.href = "checkout.html");
  }),
    r();
});
