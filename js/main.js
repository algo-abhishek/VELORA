/* ==========================================================================
   MAIN.JS
   Small helper functions used on every page: dark/light mode, the mobile
   menu, toast pop-ups, and showing "Hi, Name" in the header once someone
   has logged in.
   ========================================================================== */

/* ---- Dark / light mode ---- */
var savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

function setThemeIcon(mode) {
  var icon = document.getElementById("themeIcon");
  if (icon === null) {
    return;
  }
  if (mode === "dark") {
    icon.innerHTML = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  } else {
    icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>';
  }
}

function toggleTheme() {
  var current = document.documentElement.getAttribute("data-theme");
  var next = (current === "dark") ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  setThemeIcon(next);
}

/* ---- Mobile menu ---- */
function toggleMobileMenu() {
  var menu = document.getElementById("mobileNav");
  if (menu !== null) {
    menu.classList.toggle("open");
  }
}

/* ---- Toast message ---- */
var toastTimer;
function showToast(message) {
  var toast = document.getElementById("toast");
  if (toast === null) {
    return;
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}

/* ---- Header search box sends the person to the shop page ---- */
function goSearch(event) {
  event.preventDefault();
  var input = document.getElementById("searchInput");
  var text = input.value.trim();
  if (text === "") {
    window.location.href = "shop.html";
  } else {
    window.location.href = "shop.html?q=" + encodeURIComponent(text);
  }
}

/* ---- Show "Login" or "Hi, Name" in the header ---- */
var userIconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"></circle><path d="M4 21v-1a8 8 0 0 1 16 0v1"></path></svg>';

function updateUserNav() {
  var area = document.getElementById("userNavArea");
  if (area === null) {
    return;
  }

  var savedUser = localStorage.getItem("user");

  if (savedUser === null) {
    area.innerHTML = '<a href="login.html" class="btn btn-dark">Login</a>';
  } else {
    var userObj = JSON.parse(savedUser);
    area.innerHTML = '<a href="profile.html" class="user-pill">' + userIconSvg + ' Hi, ' + userObj.name + '</a>';
  }
}

/* ---- Newsletter form (demo only, no email is really sent) ---- */
function submitNewsletter(event) {
  event.preventDefault();
  showToast("Subscribed! Watch your inbox for new drops.");
  event.target.reset();
}

/* ---- Run this on every page once it has loaded ---- */
window.addEventListener("DOMContentLoaded", function () {
  var theme = document.documentElement.getAttribute("data-theme") || "light";
  setThemeIcon(theme);
  updateUserNav();

  var yearSpan = document.getElementById("year");
  if (yearSpan !== null) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (typeof updateCounts === "function") {
    updateCounts();
  }
});
