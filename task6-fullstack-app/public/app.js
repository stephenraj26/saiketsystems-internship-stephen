// Front end for the User Management System.
// It talks to the Express API using fetch().

const API = "/api/users";

const form = document.getElementById("userForm");
const idInput = document.getElementById("userId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const messageEl = document.getElementById("message");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");
const rowsEl = document.getElementById("userRows");
const emptyEl = document.getElementById("empty");
const countEl = document.getElementById("count");

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message " + (type || "");
}

// Put the form back into "add" mode
function resetForm() {
  form.reset();
  idInput.value = "";
  formTitle.textContent = "Add a user";
  saveBtn.textContent = "Add user";
  cancelBtn.hidden = true;
}

// Make a table cell with plain text (textContent keeps user data safe from HTML injection)
function cell(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

function makeButton(label, className, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.className = "btn btn-small " + className;
  button.addEventListener("click", onClick);
  return button;
}

// VIEW: load all users and draw the table
async function loadUsers() {
  try {
    const response = await fetch(API);
    const users = await response.json();

    rowsEl.replaceChildren();
    users.forEach(function (user) {
      const tr = document.createElement("tr");
      tr.append(cell(user.id), cell(user.name), cell(user.email), cell(user.age));

      const actions = document.createElement("td");
      actions.className = "actions-cell";
      actions.append(
        makeButton("Edit", "btn-plain", function () { startEdit(user); }),
        makeButton("Delete", "btn-danger", function () { removeUser(user); })
      );
      tr.append(actions);
      rowsEl.append(tr);
    });

    emptyEl.hidden = users.length > 0;
    countEl.textContent = "(" + users.length + ")";
  } catch (error) {
    showMessage("Could not load users. Is the server running?", "error");
  }
}

// Fill the form so the user can update a profile
function startEdit(user) {
  idInput.value = user.id;
  nameInput.value = user.name;
  emailInput.value = user.email;
  ageInput.value = user.age;
  formTitle.textContent = "Update user #" + user.id;
  saveBtn.textContent = "Save changes";
  cancelBtn.hidden = false;
  showMessage("", "");
  nameInput.focus();
}

// DELETE
async function removeUser(user) {
  if (!confirm("Delete " + user.name + "?")) return;
  try {
    const response = await fetch(API + "/" + user.id, { method: "DELETE" });
    if (!response.ok) throw new Error();
    showMessage("User deleted.", "ok");
    if (idInput.value === String(user.id)) resetForm();
    loadUsers();
  } catch (error) {
    showMessage("Could not delete the user.", "error");
  }
}

// ADD or UPDATE (depends on whether a hidden id is set)
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const payload = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    age: ageInput.value === "" ? null : Number(ageInput.value)
  };

  const editing = idInput.value !== "";
  const url = editing ? API + "/" + idInput.value : API;
  const method = editing ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok) {
      showMessage(data.error || "Something went wrong.", "error");
      return;
    }

    showMessage(editing ? "User updated." : "User added.", "ok");
    resetForm();
    loadUsers();
  } catch (error) {
    showMessage("Could not reach the server.", "error");
  }
});

cancelBtn.addEventListener("click", function () {
  resetForm();
  showMessage("", "");
});

loadUsers();
