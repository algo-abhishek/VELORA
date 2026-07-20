/* ==========================================================================
   PRODUCT.JS
   Reads ?id= from the page URL, finds that shoe in data.js, and builds
   the whole product detail page: gallery, size/colour pickers, quantity,
   tabs, and a row of related products.
   ========================================================================== */

var chosenSize = null;
var chosenColor = null;
var chosenQty = 1;

function loadProductPage() {
  var params = new URLSearchParams(window.location.search);
  var product = findProduct(params.get("id"));
  var box = document.getElementById("productBox");

  if (product === null) {
    box.innerHTML = '<div class="no-results"><h3>Product not found</h3><p>The product you are looking for may have been removed.</p>' +
      '<a href="shop.html" class="btn btn-primary" style="margin-top:16px">Back to Shop</a></div>';
    return;
  }

  document.title = product.name + " — Urban Stride";
  document.getElementById("crumbProduct").textContent = product.name;

  chosenSize = product.sizes[0];
  chosenColor = product.colors[0];
  chosenQty = 1;

  var discount = Math.round(100 - (product.price / product.old * 100));

  /* Size buttons */
  var sizeHtml = "";
  for (var i = 0; i < product.sizes.length; i++) {
    var sizeActive = (i === 0) ? "active" : "";
    sizeHtml += '<button type="button" class="size-btn ' + sizeActive + '" onclick="pickSize(this, ' + product.sizes[i] + ')">' + product.sizes[i] + '</button>';
  }

  /* Colour swatches */
  var colorHtml = "";
  for (var c = 0; c < product.colors.length; c++) {
    var hex = colorHex[product.colors[c]] || "#cccccc";
    var colorActive = (c === 0) ? "active" : "";
    colorHtml += '<button type="button" class="color-swatch ' + colorActive + '" style="background:' + hex + '" title="' + product.colors[c] + '" onclick="pickColor(this, \'' + product.colors[c] + '\')"></button>';
  }

  var html = '';
  html += '<div class="product-detail">';

  html +=   '<div>';
  html +=     '<div class="main-image" id="mainImage"><img src="' + product.img + '" alt="' + product.name + '"></div>';
  html +=     '<div class="thumb-row">';
  html +=       '<div class="thumb active"><img src="' + product.img + '" alt="' + product.name + '"></div>';
  html +=       '<div class="thumb"><img src="' + product.img + '" alt="' + product.name + '"></div>';
  html +=       '<div class="thumb"><img src="' + product.img + '" alt="' + product.name + '"></div>';
  html +=     '</div>';
  html +=   '</div>';

  html +=   '<div>';
  html +=     '<span class="pd-brand">' + product.brand + '</span>';
  html +=     '<h1 class="pd-title">' + product.name + '</h1>';
  html +=     '<div class="stars">' + starsText(product.rating) + ' <span>' + product.rating + ' (' + product.reviews + ' reviews)</span></div>';
  html +=     '<div class="pd-price" style="margin-top:14px">';
  html +=       '<span class="price">' + formatPrice(product.price) + '</span>';
  html +=       '<span class="old-price">' + formatPrice(product.old) + '</span>';
  html +=       '<span style="color:var(--green);font-weight:700;font-size:13px">' + discount + '% OFF</span>';
  html +=     '</div>';
  html +=     '<p class="pd-desc">A comfortable ' + product.gender + "'s " + product.category.toLowerCase() + ' shoe with a cushioned sole and breathable upper, made for everyday wear.</p>';

  html +=     '<div class="option-block"><h5>Size (UK)</h5><div class="size-grid" id="sizeGrid">' + sizeHtml + '</div></div>';
  html +=     '<div class="option-block"><h5>Colour</h5><div class="color-grid" id="colorGrid">' + colorHtml + '</div></div>';

  html +=     '<div class="option-block">';
  html +=       '<h5>Quantity</h5>';
  html +=       '<div class="qty-box"><button onclick="changeQty(-1)">−</button><span id="qtyText">1</span><button onclick="changeQty(1)">+</button></div>';
  html +=     '</div>';

  html +=     '<div class="action-row">';
  html +=       '<button class="btn btn-outline" onclick="handleAddToCart(' + product.id + ')">Add to Cart</button>';
  html +=       '<button class="btn btn-primary" onclick="handleBuyNow(' + product.id + ')">Buy Now</button>';
  html +=     '</div>';

  html +=     '<div class="pd-perks">';
  html +=       '<span>🚚 Free shipping on orders above ₹4,999</span>';
  html +=       '<span>↩️ Easy 30-day returns</span>';
  html +=       '<span>🔒 100% secure payment</span>';
  html +=     '</div>';
  html +=   '</div>';

  html += '</div>';

  /* Tabs: description / specifications / reviews */
  html += '<div class="tabs-head">';
  html +=   '<button class="active" onclick="switchTab(this, \'desc\')">Description</button>';
  html +=   '<button onclick="switchTab(this, \'specs\')">Specifications</button>';
  html +=   '<button onclick="switchTab(this, \'reviews\')">Reviews (' + product.reviews + ')</button>';
  html += '</div>';

  html += '<div class="tab-content active" id="tab-desc">';
  html +=   '<p>The ' + product.name + ' from ' + product.brand + ' is built for everyday comfort. A lightweight sole absorbs ' +
            'impact while the upper keeps your feet cool. Great for ' + product.category.toLowerCase() + ' or just walking around town.</p>';
  html += '</div>';

  html += '<div class="tab-content" id="tab-specs">';
  html +=   '<table class="spec-table">';
  html +=     '<tr><td>Brand</td><td>' + product.brand + '</td></tr>';
  html +=     '<tr><td>Gender</td><td>' + product.gender + '</td></tr>';
  html +=     '<tr><td>Category</td><td>' + product.category + '</td></tr>';
  html +=     '<tr><td>Available Sizes</td><td>UK ' + product.sizes.join(", ") + '</td></tr>';
  html +=     '<tr><td>Available Colours</td><td>' + product.colors.join(", ") + '</td></tr>';
  html +=     '<tr><td>Sole Material</td><td>Rubber sole with cushioned midsole</td></tr>';
  html +=     '<tr><td>Closure Type</td><td>Lace-up</td></tr>';
  html +=   '</table>';
  html += '</div>';

  html += '<div class="tab-content" id="tab-reviews">' + buildSampleReviews(product) + '</div>';

  box.innerHTML = html;

  loadRelatedProducts(product);
}

function buildSampleReviews(product) {
  var names = ["Priya S.", "Rohit K.", "Ananya G."];
  var texts = [
    "Really comfortable for daily wear, true to size.",
    "Good quality for the price, delivery was quick.",
    "Loved the fit, will be ordering another colour soon."
  ];
  var html = "";
  for (var i = 0; i < names.length; i++) {
    html += '<div style="padding:14px 0;border-bottom:1px solid var(--line)">';
    html +=   '<strong style="color:var(--text)">' + names[i] + '</strong> <span class="stars">' + starsText(4) + '</span>';
    html +=   '<p style="margin-top:5px">' + texts[i] + '</p>';
    html += '</div>';
  }
  return html;
}

function pickSize(button, size) {
  var allButtons = document.querySelectorAll("#sizeGrid .size-btn");
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove("active");
  }
  button.classList.add("active");
  chosenSize = size;
}

function pickColor(button, color) {
  var allButtons = document.querySelectorAll("#colorGrid .color-swatch");
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove("active");
  }
  button.classList.add("active");
  chosenColor = color;
}

function changeQty(amount) {
  chosenQty = chosenQty + amount;
  if (chosenQty < 1) {
    chosenQty = 1;
  }
  document.getElementById("qtyText").textContent = chosenQty;
}

function switchTab(button, tabName) {
  var buttons = document.querySelectorAll(".tabs-head button");
  var panels = document.querySelectorAll(".tab-content");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  for (var j = 0; j < panels.length; j++) {
    panels[j].classList.remove("active");
  }

  button.classList.add("active");
  document.getElementById("tab-" + tabName).classList.add("active");
}

function handleAddToCart(id) {
  addToCart(id, chosenSize, chosenColor, chosenQty);
}

function handleBuyNow(id) {
  addToCart(id, chosenSize, chosenColor, chosenQty);
  window.location.href = "cart.html";
}

function loadRelatedProducts(product) {
  var related = [];

  for (var i = 0; i < products.length; i++) {
    if (products[i].id !== product.id && products[i].category === product.category) {
      related.push(products[i]);
    }
    if (related.length === 4) { break; }
  }

  if (related.length < 4) {
    for (var j = 0; j < products.length; j++) {
      if (products[j].id !== product.id && related.indexOf(products[j]) === -1) {
        related.push(products[j]);
      }
      if (related.length === 4) { break; }
    }
  }

  var html = "";
  for (var k = 0; k < related.length; k++) {
    var item = related[k];
    var liked = isInWishlist(item.id) ? "active" : "";
    var discount = Math.round(100 - (item.price / item.old * 100));

    html += '<div class="prod-card">';
    html +=   '<div class="prod-thumb">';
    html +=     '<span class="discount-tag">-' + discount + '%</span>';
    html +=     '<button class="wish-btn ' + liked + '" onclick="handleWishRelated(event, ' + item.id + ')">';
    html +=       '<svg width="16" height="16" viewBox="0 0 24 24" fill="' + (liked ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
    html +=     '</button>';
    html +=     '<a href="product.html?id=' + item.id + '"><img src="' + item.img + '" alt="' + item.name + '"></a>';
    html +=   '</div>';
    html +=   '<div class="prod-body">';
    html +=     '<span class="prod-brand">' + item.brand + '</span>';
    html +=     '<h4><a href="product.html?id=' + item.id + '">' + item.name + '</a></h4>';
    html +=     '<div class="price-row"><span class="price">' + formatPrice(item.price) + '</span></div>';
    html +=     '<div class="stars">' + starsText(item.rating) + ' <span>(' + item.reviews + ')</span></div>';
    html +=     '<button class="add-cart-btn" onclick="addToCart(' + item.id + ', ' + item.sizes[0] + ', \'' + item.colors[0] + '\', 1)">Add to Cart</button>';
    html +=   '</div>';
    html += '</div>';
  }
  document.getElementById("relatedGrid").innerHTML = html;
}

function handleWishRelated(event, id) {
  event.preventDefault();
  var nowLiked = toggleWishlist(id);
  event.currentTarget.classList.toggle("active", nowLiked);
}

window.addEventListener("DOMContentLoaded", loadProductPage);
