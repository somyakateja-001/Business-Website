

/* =========================
   CART STORAGE
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   ADD TO CART
========================= */
window.addToCart = function(name, price, image) {
  cart.push({ name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " added to cart 🛒");
};

/* =========================
   UPDATE CART COUNT
========================= */
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.innerText = cart.length;
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(index) {
  if (confirm("Remove this item?")) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

/* =========================
   RENDER CART
========================= */
function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalDiv = document.getElementById("total");

  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty 🛒</p>";
    if (totalDiv) totalDiv.innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p class="price">₹${item.price}</p>
      <button class="delete-btn" onclick="removeItem(${index})">Delete</button>
    `;

    cartItemsDiv.appendChild(div);
    total += Number(item.price);
  });

  if (totalDiv) totalDiv.innerText = "Total: ₹" + total;

  updateCartCount();
}

/* =========================
   WHATSAPP ORDER
========================= */
function sendWhatsAppMessage() {
  if (cart.length === 0) {
    alert("Your cart is empty 🛒");
    return;
  }

  let total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  let message = "Hi, I have completed the payment \n\n";

  message += "Name:\n";
  message += "Phone:\n";
  message += "Address:\n\n";

  message += "Items:\n";

  cart.forEach(item => {
    message += "- " + item.name + " (₹" + item.price + ")\n";
  });

  message += "\nTotal Paid: ₹" + total;

  message += "\n\n Please don’t forget to attach your payment screenshot.";
  message += "\nThis will help us confirm your order faster 💖";

  let url = "https://wa.me/919588836494?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}

/* =========================
   POPUP (SESSION BASED)
========================= */
document.addEventListener("DOMContentLoaded", function () {

  // update cart count everywhere
  updateCartCount();
  renderCart();

  const popup = document.getElementById("welcome-popup");

  if (popup) {
    if (!sessionStorage.getItem("popupShown")) {
      popup.style.display = "flex";
    } else {
      popup.style.display = "none";
    }
  }

  /* =========================
     IMAGE CLICK POPUP (NEW)
  ========================= */

  const imagePopup = document.getElementById("popup");
  const popupImg = document.getElementById("popup-img");

  if (imagePopup && popupImg) {
    document.querySelectorAll(".click-img").forEach(img => {
      img.addEventListener("click", function () {
        imagePopup.style.display = "flex";
        popupImg.src = this.src;
      });
    });

    imagePopup.addEventListener("click", function () {
      imagePopup.style.display = "none";
    });
  }

});

/* =========================
   CLOSE POPUP
========================= */
function closePopup() {
  const popup = document.getElementById("welcome-popup");

  if (popup) {
    popup.style.display = "none";
    sessionStorage.setItem("popupShown", "true");
  }
}
