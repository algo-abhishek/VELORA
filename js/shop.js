/* ==========================================================================
   SHOP.JS
   Runs the shop page: gender tabs (All/Men/Women/Kids), the filter
   sidebar (category, brand, size, colour), sorting, and drawing the
   product cards.

   NOTE ON THE SIZE/COLOUR BUG FROM BEFORE:
   Last time, size and colour used a hidden checkbox inside a label,
   and clicking the label toggled the checkbox AND ran our own JS at
   the same time - so the two toggles fought each other and the filter
   never worked properly. This time each size/colour is just a plain
   button. Clicking it only runs our own JS, so there's nothing to
   fight with, and it always works.
   ========================================================================== */

/* Everything the person has selected right now lives in this one object */
var filters = {
  gender: "all",
  category: [],
  brands: [],
  sizes: [],
  colors: [],
  search: "",
  sort: ""
};

/* ---------- Build the sidebar filter lists from the product data ---------- */
function buildFilterLists() {

  /* Category checkboxes (Running, Casual, Sports, Sneakers, Formal) */
  var categories = [];
  for (var i = 0; i < products.length; i++) {
    if (categories.indexOf(products[i].category) === -1) {
      categories.push(products[i].category);
    }
  }
  var categoryHtml = "";
  for (var c = 0; c < categories.length; c++) {
    categoryHtml += '<label><input type="checkbox" value="' + categories[c] + '" class="category-check"> ' + categories[c] + '</label>';
  }
  document.getElementById("categoryFilterList").innerHTML = categoryHtml;

  var categoryBoxes = document.querySelectorAll(".category-check");
  for (var cb = 0; cb < categoryBoxes.length; cb++) {
    categoryBoxes[cb].addEventListener("change", function () {
      updateCategoryFilter();
      renderProducts();
    });
  }

  /* Brand checkboxes */
  var brands = [];
  for (var j = 0; j < products.length; j++) {
    if (brands.indexOf(products[j].brand) === -1) {
      brands.push(products[j].brand);
    }
  }
  var brandHtml = "";
  for (var b = 0; b < brands.length; b++) {
    brandHtml += '<label><input type="checkbox" value="' + brands[b] + '" class="brand-check"> ' + brands[b] + '</label>';
  }
  document.getElementById("brandFilterList").innerHTML = brandHtml;

  var brandBoxes = document.querySelectorAll(".brand-check");
  for (var bb = 0; bb < brandBoxes.length; bb++) {
    brandBoxes[bb].addEventListener("change", function () {
      updateBrandFilter();
      renderProducts();
    });
  }

  /* Size buttons - plain buttons, not hidden checkboxes (this is the fix) */
  var sizes = [];
  for (var k = 0; k < products.length; k++) {
    for (var s = 0; s < products[k].sizes.length; s++) {
      if (sizes.indexOf(products[k].sizes[s]) === -1) {
        sizes.push(products[k].sizes[s]);
      }
    }
  }
  sizes.sort(function (a, b2) { return a - b2; });

  var sizeHtml = "";
  for (var si = 0; si < sizes.length; si++) {
    sizeHtml += '<button type="button" class="size-btn" data-size="' + sizes[si] + '">' + sizes[si] + '</button>';
  }
  document.getElementById("sizeFilterList").innerHTML = sizeHtml;

  var sizeButtons = document.querySelectorAll(".size-btn");
  for (var sb = 0; sb < sizeButtons.length; sb++) {
    sizeButtons[sb].addEventListener("click", function () {
      var size = this.getAttribute("data-size");
      var index = filters.sizes.indexOf(size);

      if (index === -1) {
        filters.sizes.push(size);
        this.classList.add("active");
      } else {
        filters.sizes.splice(index, 1);
        this.classList.remove("active");
      }
      renderProducts();
    });
  }

  /* Colour swatches - also plain buttons */
  var seenColors = [];
  for (var m = 0; m < products.length; m++) {
    for (var cc = 0; cc < products[m].colors.length; cc++) {
      if (seenColors.indexOf(products[m].colors[cc]) === -1) {
        seenColors.push(products[m].colors[cc]);
      }
    }
  }
  var colorHtml = "";
  for (var co = 0; co < seenColors.length; co++) {
    var hex = colorHex[seenColors[co]] || "#cccccc";
    colorHtml += '<button type="button" class="color-swatch" data-color="' + seenColors[co] + '" style="background:' + hex + '" title="' + seenColors[co] + '"></button>';
  }
  document.getElementById("colorFilterList").innerHTML = colorHtml;

  var colorButtons = document.querySelectorAll(".color-swatch");
  for (var clr = 0; clr < colorButtons.length; clr++) {
    colorButtons[clr].addEventListener("click", function () {
      var colorName = this.getAttribute("data-color");
      var index = filters.colors.indexOf(colorName);

      if (index === -1) {
        filters.colors.push(colorName);
        this.classList.add("active");
      } else {
        filters.colors.splice(index, 1);
        this.classList.remove("active");
      }
      renderProducts();
    });
  }
}

function updateCategoryFilter() {
  filters.category = [];
  var boxes = document.querySelectorAll(".category-check:checked");
  for (var i = 0; i < boxes.length; i++) {
    filters.category.push(boxes[i].value);
  }
}

function updateBrandFilter() {
  filters.brands = [];
  var boxes = document.querySelectorAll(".brand-check:checked");
  for (var i = 0; i < boxes.length; i++) {
    filters.brands.push(boxes[i].value);
  }
}

/* ---------- Gender tabs (All / Men / Women / Kids) ---------- */
function setupGenderTabs() {
  var tabs = document.querySelectorAll(".gender-tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      for (var t = 0; t < tabs.length; t++) {
        tabs[t].classList.remove("active");
      }
      this.classList.add("active");
      filters.gender = this.getAttribute("data-gender");
      renderProducts();
    });
  }
}

/* ---------- Read ?category= / ?q= from the URL when the page first loads ---------- */
function readUrlFilters() {
  var params = new URLSearchParams(window.location.search);
  var category = params.get("category");
  var search = params.get("q");

  if (category) {
    var box = document.querySelector('.category-check[value="' + category + '"]');
    if (box) {
      box.checked = true;
      updateCategoryFilter();
    }
  }
  if (search) {
    document.getElementById("searchInput").value = search;
    filters.search = search.toLowerCase();
  }
}

/* ---------- Clear all filters button ---------- */
function setupClearFilters() {
  document.getElementById("clearFiltersBtn").addEventListener("click", function () {
    filters.category = [];
    filters.brands = [];
    filters.sizes = [];
    filters.colors = [];

    var checkboxes = document.querySelectorAll(".category-check, .brand-check");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    var activeButtons = document.querySelectorAll(".size-btn.active, .color-swatch.active");
    for (var a = 0; a < activeButtons.length; a++) {
      activeButtons[a].classList.remove("active");
    }
    renderProducts();
  });
}

/* ---------- Sort dropdown ---------- */
function setupSort() {
  document.getElementById("sortSelect").addEventListener("change", function () {
    filters.sort = this.value;
    renderProducts();
  });
}

/* ---------- Search box ---------- */
function setupSearch() {
  var input = document.getElementById("searchInput");
  input.addEventListener("input", function () {
    filters.search = this.value.toLowerCase().trim();
    renderProducts();
  });
}

/* ---------- Mobile off-canvas filter panel ---------- */
function setupMobileFilterPanel() {
  var sidebar = document.getElementById("filtersSidebar");
  var overlay = document.getElementById("overlay");

  document.getElementById("mobileFilterBtn").addEventListener("click", function () {
    sidebar.classList.add("open");
    overlay.classList.add("open");
  });
  document.getElementById("closeFilters").addEventListener("click", function () {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  });
}

/* ---------- Build one product card ---------- */
function buildProductCard(item) {
  var liked = isInWishlist(item.id) ? "active" : "";
  var discount = Math.round(100 - (item.price / item.old * 100));

  var swatches = "";
  for (var c = 0; c < item.colors.length; c++) {
    swatches += '<span class="mini-swatch" style="background:' + colorHex[item.colors[c]] + '" title="' + item.colors[c] + '"></span>';
  }

  var html = '';
  html += '<div class="prod-card">';
  html +=   '<div class="prod-thumb">';
  html +=     '<span class="discount-tag">-' + discount + '%</span>';
  html +=     '<button class="wish-btn ' + liked + '" onclick="handleWish(event, ' + item.id + ')">';
  html +=       '<svg width="16" height="16" viewBox="0 0 24 24" fill="' + (liked ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
  html +=     '</button>';
  html +=     '<a href="product.html?id=' + item.id + '"><img src="' + item.img + '" alt="' + item.name + '" loading="lazy"></a>';
  html +=   '</div>';
  html +=   '<div class="prod-body">';
  html +=     '<span class="prod-brand">' + item.brand + '</span>';
  html +=     '<h4><a href="product.html?id=' + item.id + '">' + item.name + '</a></h4>';
  html +=     '<div class="price-row"><span class="price">' + formatPrice(item.price) + '</span><span class="old-price">' + formatPrice(item.old) + '</span></div>';
  html +=     '<div class="stars">' + starsText(item.rating) + ' <span>(' + item.reviews + ')</span></div>';
  html +=     '<div class="mini-swatch-row">' + swatches + '</div>';
  html +=     '<button class="add-cart-btn" onclick="addToCart(' + item.id + ', ' + item.sizes[0] + ', \'' + item.colors[0] + '\', 1)">Add to Cart</button>';
  html +=   '</div>';
  html += '</div>';
  return html;
}

function handleWish(event, id) {
  event.preventDefault();
  var nowLiked = toggleWishlist(id);
  event.currentTarget.classList.toggle("active", nowLiked);
}

/* ---------- Filter, sort and draw the whole product grid ---------- */
function renderProducts() {
  var list = [];

  for (var i = 0; i < products.length; i++) {
    var p = products[i];

    if (filters.gender !== "all" && p.gender !== filters.gender) { continue; }
    if (filters.category.length > 0 && filters.category.indexOf(p.category) === -1) { continue; }
    if (filters.brands.length > 0 && filters.brands.indexOf(p.brand) === -1) { continue; }

    if (filters.sizes.length > 0) {
      var hasSize = false;
      for (var s = 0; s < filters.sizes.length; s++) {
        if (p.sizes.indexOf(Number(filters.sizes[s])) !== -1) { hasSize = true; }
      }
      if (hasSize === false) { continue; }
    }

    if (filters.colors.length > 0) {
      var hasColor = false;
      for (var c = 0; c < filters.colors.length; c++) {
        if (p.colors.indexOf(filters.colors[c]) !== -1) { hasColor = true; }
      }
      if (hasColor === false) { continue; }
    }

    if (filters.search && p.name.toLowerCase().indexOf(filters.search) === -1 && p.brand.toLowerCase().indexOf(filters.search) === -1) {
      continue;
    }

    list.push(p);
  }

  if (filters.sort === "price-asc") {
    list.sort(function (a, b) { return a.price - b.price; });
  } else if (filters.sort === "price-desc") {
    list.sort(function (a, b) { return b.price - a.price; });
  } else if (filters.sort === "rating-desc") {
    list.sort(function (a, b) { return b.rating - a.rating; });
  }

  document.getElementById("resultsCount").textContent = list.length + (list.length === 1 ? " product found" : " products found");

  var grid = document.getElementById("prodGrid");
  if (list.length === 0) {
    grid.innerHTML = '<div class="no-results"><div class="big-ico">🔍</div>No shoes match your filters.<br>Try clearing a filter or searching something else.</div>';
    return;
  }

  var html = "";
  for (var g = 0; g < list.length; g++) {
    html += buildProductCard(list[g]);
  }
  grid.innerHTML = html;
}

/* ---------- Run everything once the page has loaded ---------- */
window.addEventListener("DOMContentLoaded", function () {
  buildFilterLists();
  setupGenderTabs();
  setupClearFilters();
  setupSort();
  setupSearch();
  setupMobileFilterPanel();
  readUrlFilters();
  renderProducts();
});
