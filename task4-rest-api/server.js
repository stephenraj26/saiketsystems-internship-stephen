// Task 4: Basic REST API with Node.js and Express
// CRUD for a "User" with name, email and age. Data is kept in memory (an array).

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // read JSON from the request body

let users = [];
let nextId = 1;

// Check the user data. Returns an error message, or null if the data is fine.
function validateUser(body) {
  const { name, email, age } = body || {};
  if (typeof name !== "string" || name.trim().length < 2) {
    return "name is required (at least 2 characters)";
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
    return "a valid email is required";
  }
  if (!Number.isInteger(age) || age < 0 || age > 120) {
    return "age must be a whole number between 0 and 120";
  }
  return null;
}

// CREATE: POST /users
app.post("/users", (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ error });

  const email = req.body.email.trim().toLowerCase();
  if (users.some((u) => u.email === email)) {
    return res.status(409).json({ error: "email already exists" });
  }

  const user = { id: nextId++, name: req.body.name.trim(), email, age: req.body.age };
  users.push(user);
  res.status(201).json(user);
});

// READ ALL: GET /users
app.get("/users", (req, res) => {
  res.json(users);
});

// READ ONE: GET /users/:id
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "user not found" });
  res.json(user);
});

// UPDATE: PUT /users/:id
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "user not found" });

  const error = validateUser(req.body);
  if (error) return res.status(400).json({ error });

  const email = req.body.email.trim().toLowerCase();
  if (users.some((u) => u.email === email && u.id !== user.id)) {
    return res.status(409).json({ error: "email already exists" });
  }

  user.name = req.body.name.trim();
  user.email = email;
  user.age = req.body.age;
  res.json(user);
});

// DELETE: DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "user not found" });
  const [removed] = users.splice(index, 1);
  res.json({ message: "user deleted", user: removed });
});

// Handle bad JSON in the request body
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "invalid JSON" });
  }
  res.status(500).json({ error: "server error" });
});

app.listen(PORT, () => console.log("API running on http://localhost:" + PORT));
