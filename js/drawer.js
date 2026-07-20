/* ==========================================================================
   DRAWER.JS
   This is the small "mini cart" panel that slides in from the right when
   you click the cart icon. It shows a quick summary - for the full
   checkout flow we send people to cart.html / checkout.html.
   ========================================================================== */

function openDrawer() {
  var drawer = document.getElementById("cartDrawer");
  var overlay = document.getElementById("overlay");
  if (drawer === null) {
    return;
  }
  drawer.classList.add("open");
  overlay.classList.add("open");
  renderDrawer();
}

function closeDrawer() {
  var drawer = document.getElementById("cartDrawer");
  var overlay = document.getElementById("overlay");
  if (drawer === null) {
    return;
  }
  drawer.classList.remove("open");
  overlay.classList.remove("open");
}

function renderDrawer() {
  var body = document.getElementById("drawerBody");
  if (body === null) {
    return;
  }

  var cart = getCart();

  if (cart.length === 0) {
    body.innerHTML = '<div class="empty-cart">Your cart is empty.<br>Add a pair of shoes to get started.</div>';
    document.getElementById("drawerTotal").textContent = formatPrice(0);
    return;
  }

  var totals = getCartTotals();
  var html = "";

  for (var i = 0; i < cart.length; i++) {
    var line = cart[i];
    var product = findProduct(line.id);
    if (product === null) {
      continue;
    }

    html += '<div class="drawer-cart-item">';
    html +=   '<img src="' + product.img + '" alt="' + product.name + '">';
    html +=   '<div class="drawer-cart-info">';
    html +=     '<h5>' + product.name + '</h5>';
    html +=     '<span class="price">' + formatPrice(product.price) + '</span>';
    html +=     '<div class="qty-row">';
    html +=       '<button class="qty-btn" onclick="changeCartQty(' + i + ', -1)">−</button>';
    html +=       '<span>' + line.qty + '</span>';
    html +=       '<button class="qty-btn" onclick="changeCartQty(' + i + ', 1)">+</button>';
    html +=       '<button class="remove-btn" onclick="removeFromCart(' + i + ')">Remove</button>';
    html +=     '</div>';
    html +=   '</div>';
    html += '</div>';
  }

  body.innerHTML = html;
  document.getElementById("drawerTotal").textContent = formatPrice(totals.total);
}

window.addEventListener("DOMContentLoaded", function () {
  var cartBtn = document.getElementById("cartBtn");
  var closeBtn = document.getElementById("closeDrawer");
  var overlay = document.getElementById("overlay");

  if (cartBtn !== null) {
    cartBtn.addEventListener("click", openDrawer);
  }
  if (closeBtn !== null) {
    closeBtn.addEventListener("click", closeDrawer);
  }
  if (overlay !== null) {
    overlay.addEventListener("click", closeDrawer);
  }
});
