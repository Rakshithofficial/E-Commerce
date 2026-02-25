
/* =====================
   SAFETY RESET (CRITICAL)
===================== */
window.addEventListener("load", () => {
  document.body.classList.remove("quick-view-open");

  const overlay = document.getElementById("quickViewOverlay");
  const panel = document.getElementById("quickViewPanel");

  overlay?.classList.remove("open");
  panel?.classList.remove("open");
});


/* =====================
   PRODUCTS DATA
===================== */
const products = [
  { id: 1, name: "Running Shoes", price: 3999, category: "Shoes", inStock: true, image: "/static/images/running-shoes.jpg" },
  { id: 2, name: "Casual Sneakers", price: 2999, category: "Shoes", inStock: true, image: "/static/images/casual-sneakers.jpg" },
  { id: 3, name: "High-Top Sneakers", price: 3499, category: "Shoes", inStock: false, image: "/static/images/high-top-sneakers.jpg" },
  { id: 4, name: "Wireless Headphones", price: 4999, category: "Electronics", inStock: true, image: "/static/images/wireless-headphones.jpg" },
  { id: 5, name: "Smart Watch", price: 6999, category: "Electronics", inStock: true, image: "/static/images/smart-watch.jpg" },
  { id: 6, name: "Bluetooth Speaker", price: 2599, category: "Electronics", inStock: true, image: "/static/images/bluetooth-speaker.jpg" },
  { id: 7, name: "Men's Hoodie", price: 1999, category: "Clothing", inStock: true, image: "/static/images/hoodie.jpg" },
  { id: 8, name: "Denim Jacket", price: 3499, category: "Clothing", inStock: true, image: "/static/images/denim-jacket.jpg" },
  { id: 9, name: "Oversized T-Shirt", price: 1299, category: "Clothing", inStock: false, image: "/static/images/oversized-tshirt.jpg" },
  { id: 10, name: "Backpack", price: 2499, category: "Accessories", inStock: true, image: "/static/images/backpack.jpg" },
  { id: 11, name: "Leather Wallet", price: 999, category: "Accessories", inStock: true, image: "/static/images/wallet.jpg" },
  { id: 12, name: "Sunglasses", price: 1599, category: "Accessories", inStock: true, image: "/static/images/sunglasses.jpg" }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

/* =====================
   QUICK VIEW ELEMENTS
===================== */
const quickViewPanel = document.getElementById("quickViewPanel");
const quickViewOverlay = document.getElementById("quickViewOverlay");
const quickViewClose = document.getElementById("quickViewClose");

const qvImage = document.getElementById("qvImage");
const qvName = document.getElementById("qvName");
const qvPrice = document.getElementById("qvPrice");
const qvStock = document.getElementById("qvStock");
const qvAddToCart = document.getElementById("qvAddToCart");

let activeProduct = null;

/* =====================
   QUICK VIEW OPEN / CLOSE
===================== */
function openQuickView(product) {
  activeProduct = product;

  qvImage.src = product.image;
  qvName.textContent = product.name;
  qvPrice.textContent = `₹${product.price}`;
  qvStock.textContent = product.inStock ? "In Stock" : "Out of Stock";

  quickViewOverlay.classList.add("open");
  quickViewPanel.classList.add("open");
  document.body.classList.add("quick-view-open");
}

function closeQuickView() {
  quickViewOverlay.classList.remove("open");
  quickViewPanel.classList.remove("open");
  document.body.classList.remove("quick-view-open");
  activeProduct = null;
}

/* CLOSE EVENTS */
quickViewClose.addEventListener("click", closeQuickView);
quickViewOverlay.addEventListener("click", closeQuickView);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeQuickView();
});

/* =====================
   CART HELPERS
===================== */
function getCart() {
  return JSON.parse(localStorage.getItem("flux_cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("flux_cart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);

  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });

  saveCart(cart);
}

/* QUICK VIEW ADD TO CART */
qvAddToCart.addEventListener("click", () => {
  if (!activeProduct) return;

  const isAuth = document.body.dataset.auth === "true";
  if (!isAuth) {
    window.location.href = "/signup/";
    return;
  }

  if (!activeProduct.inStock) return;

  addToCart(activeProduct);
  qvAddToCart.textContent = "Added ✓";

  setTimeout(() => {
    qvAddToCart.textContent = "Add to Cart";
  }, 900);
});

/* =====================
   RENDER PRODUCTS
===================== */
function renderProducts(list) {
  productGrid.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = product.id;

    card.innerHTML = `
      <div class="image-wrap">
        <img src="${product.image}" alt="${product.name}">
        <span class="stock-badge ${product.inStock ? "in" : "out"}">
          ${product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <button class="add-to-cart-btn" ${!product.inStock ? "disabled" : ""}>
          Add to Cart
        </button>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

/* =====================
   CARD CLICK HANDLING
===================== */
productGrid.addEventListener("click", e => {
  const card = e.target.closest(".product-card");
  if (!card) return;

  const product = products.find(p => p.id === Number(card.dataset.id));
  if (!product) return;

  const addBtn = e.target.closest(".add-to-cart-btn");

  if (addBtn) {
    e.stopPropagation();

    const isAuth = document.body.dataset.auth === "true";
    if (!isAuth) {
      window.location.href = "/signup/";
      return;
    }

    if (!product.inStock) return;

    addToCart(product);
    addBtn.textContent = "Added ✓";
    addBtn.disabled = true;

    setTimeout(() => {
      addBtn.textContent = "Add to Cart";
      addBtn.disabled = false;
    }, 800);

    return;
  }

  openQuickView(product);
});

/* =====================
   SEARCH
===================== */
searchInput?.addEventListener("input", () => {
  const val = searchInput.value.toLowerCase();
  renderProducts(
    products.filter(p =>
      p.name.toLowerCase().includes(val) ||
      p.category.toLowerCase().includes(val)
    )
  );
});

/* =====================
   CATEGORY FILTER
===================== */
document.querySelectorAll(".category-sidebar li").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".category-sidebar li")
      .forEach(i => i.classList.remove("active"));

    item.classList.add("active");

    const cat = item.dataset.category;
    renderProducts(cat === "all" ? products : products.filter(p => p.category === cat));
  });
});

/* =====================
   INIT
===================== */
renderProducts(products);