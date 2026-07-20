/* ==========================================================================
   CART.JS
   Handles the shopping cart and wishlist. Everything is saved in
   localStorage since this project has no real backend/server.
   ========================================================================== */

function getCart() {
  var saved = localStorage.getItem("cart");
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

function saveCart(cartList) {
  localStorage.setItem("cart", JSON.stringify(cartList));
  updateCounts();
}

function getWishlist() {
  var saved = localStorage.getItem("wishlist");
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

function saveWishlist(list) {
  localStorage.setItem("wishlist", JSON.stringify(list));
  updateCounts();
}

/* Add an item to the cart, or add +1 quantity if it's already there */
function addToCart(productId, size, color, qty) {
  var cart = getCart();
  var found = false;

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === productId && cart[i].size === size && cart[i].color === color) {
      cart[i].qty = cart[i].qty + qty;
      found = true;
      break;
    }
  }

  if (found === false) {
    cart.push({ id: productId, size: size, color: color, qty: qty });
  }

  saveCart(cart);
  showToast("Added to cart");

  /* If the mini cart drawer is on this page, refresh it too */
  if (typeof renderDrawer === "function") {
    renderDrawer();
  }
}

function removeFromCart(index) {
  var cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  if (typeof renderCartPage === "function") {
    renderCartPage();
  }
  if (typeof renderDrawer === "function") {
    renderDrawer();
  }
  showToast("Item removed");
}

function changeCartQty(index, amount) {
  var cart = getCart();
  cart[index].qty = cart[index].qty + amount;
  if (cart[index].qty < 1) {
    cart[index].qty = 1;
  }
  saveCart(cart);
  if (typeof renderCartPage === "function") {
    renderCartPage();
  }
  if (typeof renderDrawer === "function") {
    renderDrawer();
  }
}

function cartItemCount() {
  var cart = getCart();
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total = total + cart[i].qty;
  }
  return total;
}

function toggleWishlist(productId) {
  var list = getWishlist();
  var index = list.indexOf(productId);

  if (index === -1) {
    list.push(productId);
    showToast("Added to wishlist");
  } else {
    list.splice(index, 1);
    showToast("Removed from wishlist");
  }

  saveWishlist(list);
  return list.indexOf(productId) !== -1;
}

function isInWishlist(productId) {
  return getWishlist().indexOf(productId) !== -1;
}

/* Update the little red numbers on the cart/wishlist icons */
function updateCounts() {
  var cartBadge = document.getElementById("cartCount");
  var wishBadge = document.getElementById("wishCount");

  if (cartBadge !== null) {
    cartBadge.textContent = cartItemCount();
  }
  if (wishBadge !== null) {
    wishBadge.textContent = getWishlist().length;
  }
}

/* Work out subtotal, shipping, tax and total for whatever is in the cart */
function getCartTotals() {
  var cart = getCart();
  var subtotal = 0;

  for (var i = 0; i < cart.length; i++) {
    var product = findProduct(cart[i].id);
    if (product !== null) {
      subtotal = subtotal + (product.price * cart[i].qty);
    }
  }

  var shipping = 99;
  if (subtotal > 4999 || subtotal === 0) {
    shipping = 0;
  }

  var tax = Math.round(subtotal * 0.05);
  var total = subtotal + shipping + tax;

  return { subtotal: subtotal, shipping: shipping, tax: tax, total: total };
}
