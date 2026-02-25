document.addEventListener("DOMContentLoaded", () => {
  const cartItemsEl = document.getElementById("cartItems");
  const cartSummaryEl = document.getElementById("cartSummary");

  function getCart() {
    return JSON.parse(localStorage.getItem("flux_cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("flux_cart", JSON.stringify(cart));
    renderCart();
  }

  function calculateTotals(cart) {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const discount = subtotal >= 3000 ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal - discount;

    return { subtotal, discount, total };
  }

  function renderCart() {
    const cart = getCart();
    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
      cartItemsEl.innerHTML = `<p class="empty-cart">Your cart is empty 🛒</p>`;
      cartSummaryEl.innerHTML = "";
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
        <div class="cart-left">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-info">
            <h4>${item.name}</h4>
            <p class="price">₹${item.price}</p>
            <button class="remove-btn">Remove</button>
          </div>
        </div>

        <div class="cart-qty">
          <button class="qty-btn minus" ${item.qty === 1 ? "disabled" : ""}>−</button>
          <span class="qty-count">${item.qty}</span>
          <button class="qty-btn plus">+</button>
        </div>
      `;

      // + button
      div.querySelector(".plus").onclick = () => {
        cart[index].qty += 1;
        saveCart(cart);
      };

      // − button
      div.querySelector(".minus").onclick = () => {
        if (cart[index].qty > 1) {
          cart[index].qty -= 1;
          saveCart(cart);
        }
      };

      // Remove
      div.querySelector(".remove-btn").onclick = () => {
        cart.splice(index, 1);
        saveCart(cart);
      };

      cartItemsEl.appendChild(div);
    });

    const { subtotal, discount, total } = calculateTotals(cart);

    cartSummaryEl.innerHTML = `
      <div class="cart-summary-card">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>₹${subtotal}</span>
        </div>

        <div class="summary-row discount">
          <span>Coupon Discount</span>
          <span>−₹${discount}</span>
        </div>

        <hr>

        <div class="summary-row total">
          <span>Total</span>
          <span>₹${total}</span>
        </div>

        <button id="placeOrderBtn" class="place-order-btn">
          Place Order
        </button>
      </div>
    `;

    document.getElementById("placeOrderBtn").onclick = placeOrder;
  }

  function placeOrder() {
    const cart = JSON.parse(localStorage.getItem("flux_cart")) || [];
    const orders = JSON.parse(localStorage.getItem("flux_orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      date: new Date().toLocaleString(),
      status: "Placed"
    };

    orders.unshift(newOrder);

    localStorage.setItem("flux_orders", JSON.stringify(orders));
    localStorage.removeItem("flux_cart");

    cartItemsEl.innerHTML = "";
    cartSummaryEl.innerHTML = `
      <div class="order-success">
        <div class="check">✓</div>
        <h3>Order Placed</h3>
        <p>Your order has been saved</p>
      </div>
    `;

    setTimeout(() => {
      // ✅ FIXED PATH (was home.html)
      window.location.href = "/home/";
    }, 2200);
  }

  renderCart();
});