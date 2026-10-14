// Contact form validation.
// Each field has a rule. A rule returns true when the value is good.

const rules = {
  name: function (value) {
    // at least 2 characters, letters and spaces only
    return value.length >= 2 && /^[A-Za-z .'-]+$/.test(value);
  },
  email: function (value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  },
  subject: function (value) {
    return value.length >= 3;
  },
  message: function (value) {
    return value.length >= 15;
  }
};

const formEl = document.getElementById("reachForm");
const okBox = document.getElementById("okBox");
const fields = formEl.querySelectorAll("[data-rule]");
const noteBox = document.getElementById("note");
const countEl = document.getElementById("count");

// Check one field and show a green or red border
function checkField(field) {
  const rule = rules[field.dataset.rule];
  const good = rule(field.value.trim());
  field.classList.toggle("is-valid", good);
  field.classList.toggle("is-invalid", !good);
  return good;
}

// Live character counter for the message box
noteBox.addEventListener("input", function () {
  countEl.textContent = noteBox.value.length;
});

// Check a field when the user leaves it, and re-check while typing if it was wrong
fields.forEach(function (field) {
  field.addEventListener("blur", function () { checkField(field); });
  field.addEventListener("input", function () {
    if (field.classList.contains("is-invalid")) { checkField(field); }
  });
});

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  okBox.classList.add("d-none");

  let allGood = true;
  fields.forEach(function (field) {
    if (!checkField(field)) { allGood = false; }
  });

  if (allGood) {
    okBox.classList.remove("d-none");
    formEl.reset();
    countEl.textContent = "0";
    fields.forEach(function (field) { field.classList.remove("is-valid", "is-invalid"); });
  }
});
