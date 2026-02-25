const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: 3999,
    category: "Shoes",
    inStock: true,
    image: "../assets/images/running-shoes.jpg"
  },
  {
    id: 2,
    name: "Casual Sneakers",
    price: 2999,
    category: "Shoes",
    inStock: true,
    image: "../assets/images/casual-sneakers.jpg"
  },
  {
    id: 3,
    name: "High-Top Sneakers",
    price: 3499,
    category: "Shoes",
    inStock: false,
    image: "../assets/images/high-top-sneakers.jpg"
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 4999,
    category: "Electronics",
    inStock: true,
    image: "../assets/images/wireless-headphones.jpg"
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 6999,
    category: "Electronics",
    inStock: true,
    image: "../assets/images/smart-watch.jpg"
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 2599,
    category: "Electronics",
    inStock: true,
    image: "../assets/images/bluetooth-speaker.jpg"
  },
  {
    id: 7,
    name: "Men's Hoodie",
    price: 1999,
    category: "Clothing",
    inStock: true,
    image: "../assets/images/hoodie.jpg"
  },
  {
    id: 8,
    name: "Denim Jacket",
    price: 3499,
    category: "Clothing",
    inStock: true,
    image: "../assets/images/denim-jacket.jpg"
  },
  {
    id: 9,
    name: "Oversized T-Shirt",
    price: 1299,
    category: "Clothing",
    inStock: false,
    image: "../assets/images/oversized-tshirt.jpg"
  },
  {
    id: 10,
    name: "Backpack",
    price: 2499,
    category: "Accessories",
    inStock: true,
    image: "../assets/images/backpack.jpg"
  },
  {
    id: 11,
    name: "Leather Wallet",
    price: 999,
    category: "Accessories",
    inStock: true,
    image: "../assets/images/wallet.jpg"
  },
  {
    id: 12,
    name: "Sunglasses",
    price: 1599,
    category: "Accessories",
    inStock: true,
    image: "../assets/images/sunglasses.jpg"
  }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

/* =====================
   CART HELPERS
===================== */
function getCart() {
  return JSON.parse(localStorage.getItem("flux_cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("flux_cart", JSON.stringify(cart));
  // future: update cart badge here
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
}

/* =====================
   RENDER PRODUCTS
===================== */
function renderProducts(list) {
  productGrid.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
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

    if (product.inStock) {
      const btn = card.querySelector(".add-to-cart-btn");
      btn.addEventListener("click", () => {
        btn.textContent = "Added ✓";
        btn.disabled = true;

        addToCart(product);

        setTimeout(() => {
          btn.textContent = "Add to Cart";
          btn.disabled = false;
        }, 800);
      });
    }
  });
}

/* INITIAL LOAD */
renderProducts(products);

/* SEARCH */
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  renderProducts(
    products.filter(p =>
      p.name.toLowerCase().includes(value) ||
      p.category.toLowerCase().includes(value)
    )
  );
});

/* CATEGORY FILTER */
document.querySelectorAll(".category-sidebar li").forEach(item => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".category-sidebar li")
      .forEach(i => i.classList.remove("active"));

    item.classList.add("active");

    const cat = item.dataset.category;
    renderProducts(
      cat === "all"
        ? products
        : products.filter(p => p.category === cat)
    );
  });
});


/* QUICK NAV PILLS (SCROLL ONLY) */
document.querySelectorAll(".filter-pill").forEach(pill => {
  pill.addEventListener("click", () => {
    const target = document.getElementById("products");

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    // Small visual tap feedback (iOS-style)
    pill.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.96)" },
        { transform: "scale(1)" }
      ],
      { duration: 180, easing: "ease-out" }
    );
  });
});

