// Three small features: cart counter, dark mode toggle, newsletter form check.

// ----- 1. Cart counter -----
let cartItems = 0;
const cartCountEl = document.getElementById("cartCount");
const cartMsgEl = document.getElementById("cartMsg");

document.querySelectorAll(".add-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    cartItems += 1;
    cartCountEl.textContent = cartItems;
    cartMsgEl.textContent = button.dataset.name + " added to your cart.";
  });
});

// ----- 2. Dark mode toggle -----
const themeBtn = document.getElementById("themeBtn");

function setTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  const isDark = mode === "dark";
  themeBtn.textContent = isDark ? "Light mode" : "Dark mode";
  themeBtn.setAttribute("aria-pressed", String(isDark));
}

themeBtn.addEventListener("click", function () {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// ----- 3. Newsletter form validation -----
const joinForm = document.getElementById("joinForm");
const joinEmail = document.getElementById("joinEmail");
const joinOk = document.getElementById("joinOk");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

joinForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const good = emailPattern.test(joinEmail.value.trim());
  joinEmail.classList.toggle("is-invalid", !good);
  joinOk.classList.toggle("d-none", !good);
  if (good) { joinForm.reset(); }
});

joinEmail.addEventListener("input", function () {
  joinEmail.classList.remove("is-invalid");
});
