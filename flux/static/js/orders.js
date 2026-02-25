document.addEventListener("DOMContentLoaded", () => {
  const ordersList = document.getElementById("ordersList");
  const orders = JSON.parse(localStorage.getItem("flux_orders")) || [];

  if (orders.length === 0) {
    ordersList.innerHTML = `<p>You have no orders yet 📦</p>`;
    return;
  }

  orders.forEach(order => {
    const div = document.createElement("div");
    div.className = "order-card";

    const itemsHTML = order.items
      .map(
        item => `
        <div class="order-item">
          <span>${item.name} × ${item.qty}</span>
          <span>₹${item.price * item.qty}</span>
        </div>
      `
      )
      .join("");

    div.innerHTML = `
      <div class="order-header">
        <span>Order #${order.id}</span>
        <span class="status">${order.status}</span>
      </div>

      <div class="order-date">${order.date}</div>

      <div class="order-items">
        ${itemsHTML}
      </div>

      <div class="order-total">
        Total: ₹${order.total}
      </div>
    `;

    ordersList.appendChild(div);
  });
});