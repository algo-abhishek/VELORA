/* ==========================================================================
   AUTH.JS
   This is a front-end only login system - there is no real server, so
   we just check the form is filled in correctly and pretend an OTP was
   sent (any 4 digits will work to "verify").
   ========================================================================== */

var loginMethod = "email";
var signupMethod = "email";
var otpPurpose = "login";

function showAuthView(viewName) {
  var allViews = ["login", "signup", "forgot", "otp", "reset"];

  for (var i = 0; i < allViews.length; i++) {
    var el = document.getElementById(allViews[i] + "View");
    if (el !== null) {
      el.style.display = (allViews[i] === viewName) ? "block" : "none";
    }
  }

  var loginTab = document.getElementById("loginTabBtn");
  var signupTab = document.getElementById("signupTabBtn");
  if (loginTab !== null) {
    loginTab.classList.toggle("active", viewName === "login");
  }
  if (signupTab !== null) {
    signupTab.classList.toggle("active", viewName === "signup");
  }
}

function setLoginMethod(method) {
  loginMethod = method;
  document.getElementById("loginEmailTab").classList.toggle("active", method === "email");
  document.getElementById("loginPhoneTab").classList.toggle("active", method === "phone");
  document.getElementById("loginEmailField").style.display = (method === "email") ? "block" : "none";
  document.getElementById("loginPhoneField").style.display = (method === "phone") ? "block" : "none";
}

function setSignupMethod(method) {
  signupMethod = method;
  document.getElementById("signupEmailTab").classList.toggle("active", method === "email");
  document.getElementById("signupPhoneTab").classList.toggle("active", method === "phone");
  document.getElementById("signupEmailField").style.display = (method === "email") ? "block" : "none";
  document.getElementById("signupPhoneField").style.display = (method === "phone") ? "block" : "none";
}

function isEmailOk(text) {
  return text.indexOf("@") !== -1 && text.indexOf(".") !== -1;
}

function isPhoneOk(text) {
  var digitsOnly = text.replace(/\D/g, "");
  return digitsOnly.length === 10;
}

function submitLogin(event) {
  event.preventDefault();

  if (loginMethod === "email") {
    var email = document.getElementById("loginEmail").value.trim();
    if (isEmailOk(email) === false) {
      showToast("Please enter a valid email address");
      return;
    }
  } else {
    var phone = document.getElementById("loginPhone").value.trim();
    if (isPhoneOk(phone) === false) {
      showToast("Please enter a valid 10-digit mobile number");
      return;
    }
  }

  var password = document.getElementById("loginPassword").value;
  if (password.length < 6) {
    showToast("Password must be at least 6 characters");
    return;
  }

  otpPurpose = "login";
  document.getElementById("otpMessage").textContent =
    "We have sent a 4-digit code to your " + (loginMethod === "email" ? "email address." : "mobile number.");
  showAuthView("otp");
}

function submitSignup(event) {
  event.preventDefault();

  var name = document.getElementById("signupName").value.trim();
  if (name === "") {
    showToast("Please enter your name");
    return;
  }

  if (signupMethod === "email") {
    var email = document.getElementById("signupEmail").value.trim();
    if (isEmailOk(email) === false) {
      showToast("Please enter a valid email address");
      return;
    }
  } else {
    var phone = document.getElementById("signupPhone").value.trim();
    if (isPhoneOk(phone) === false) {
      showToast("Please enter a valid 10-digit mobile number");
      return;
    }
  }

  var password = document.getElementById("signupPassword").value;
  if (password.length < 6) {
    showToast("Password must be at least 6 characters");
    return;
  }

  var termsBox = document.getElementById("signupTerms");
  if (termsBox.checked === false) {
    showToast("Please accept the Terms & Conditions");
    return;
  }

  otpPurpose = "signup";
  document.getElementById("otpMessage").textContent =
    "We have sent a 4-digit code to verify your " + (signupMethod === "email" ? "email address." : "mobile number.");
  showAuthView("otp");
}

function submitForgot(event) {
  event.preventDefault();
  var contact = document.getElementById("forgotContact").value.trim();
  if (contact === "") {
    showToast("Please enter your email or mobile number");
    return;
  }
  otpPurpose = "forgot";
  document.getElementById("otpMessage").textContent = "Enter the 4-digit code sent to reset your password.";
  showAuthView("otp");
}

function togglePassword(inputId, button) {
  var input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

function otpNextBox(input) {
  if (input.value.length === 1 && input.nextElementSibling !== null) {
    input.nextElementSibling.focus();
  }
}

function verifyOtp() {
  var boxes = document.querySelectorAll("#otpView .otp-row input");
  var code = "";
  for (var i = 0; i < boxes.length; i++) {
    code += boxes[i].value;
  }

  if (code.length < 4) {
    showToast("Please enter the full 4-digit code");
    return;
  }

  if (otpPurpose === "forgot") {
    showAuthView("reset");
  } else if (otpPurpose === "signup") {
    var typedName = document.getElementById("signupName").value.trim();
    localStorage.setItem("user", JSON.stringify({ name: typedName }));
    showToast("Account created successfully!");
    setTimeout(function () { window.location.href = "profile.html"; }, 900);
  } else {
    var existing = localStorage.getItem("user");
    if (existing === null) {
      localStorage.setItem("user", JSON.stringify({ name: "Guest User" }));
    }
    showToast("Login successful!");
    setTimeout(function () { window.location.href = "profile.html"; }, 900);
  }
}

function submitReset(event) {
  event.preventDefault();
  showToast("Password reset successfully. Please login again.");
  setTimeout(function () { showAuthView("login"); }, 800);
}
