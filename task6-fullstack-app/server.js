// Task 6: Full Stack User Management System
// Express API + SQLite database + a front end served from the "public" folder.

const express = require("express");
const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serves the front end

// Connect to the database file and create the table if it does not exist
const db = new Database(path.join(__dirname, "users.db"));
db.exec(fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8"));

function validateUser(body) {
  const { name, email, age } = body || {};
  if (typeof name !== "string" || name.trim().length < 2) return "name is required (at least 2 characters)";
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return "a valid email is required";
  if (!Number.isInteger(age) || age < 0 || age > 120) return "age must be a whole number between 0 and 120";
  return null;
}

// CREATE
app.post("/api/users", (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ error });

  const email = req.body.email.trim().toLowerCase();
  try {
    // The ? marks are placeholders. They keep the query safe from SQL injection.
    const result = db
      .prepare("INSERT INTO users (name, email, age) VALUES (?, ?, ?)")
      .run(req.body.name.trim(), email, req.body.age);
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json(user);
  } catch (e) {
    if (String(e.code).startsWith("SQLITE_CONSTRAINT")) {
      return res.status(409).json({ error: "email already exists" });
    }
    res.status(500).json({ error: "server error" });
  }
});

// READ ALL
app.get("/api/users", (req, res) => {
  res.json(db.prepare("SELECT * FROM users ORDER BY id").all());
});

// READ ONE
app.get("/api/users/:id", (req, res) => {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "user not found" });
  res.json(user);
});

// UPDATE
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!db.prepare("SELECT id FROM users WHERE id = ?").get(id)) {
    return res.status(404).json({ error: "user not found" });
  }
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ error });

  try {
    db.prepare("UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?")
      .run(req.body.name.trim(), req.body.email.trim().toLowerCase(), req.body.age, id);
    res.json(db.prepare("SELECT * FROM users WHERE id = ?").get(id));
  } catch (e) {
    if (String(e.code).startsWith("SQLITE_CONSTRAINT")) {
      return res.status(409).json({ error: "email already exists" });
    }
    res.status(500).json({ error: "server error" });
  }
});

// DELETE
app.delete("/api/users/:id", (req, res) => {
  const result = db.prepare("DELETE FROM users WHERE id = ?").run(Number(req.params.id));
  if (result.changes === 0) return res.status(404).json({ error: "user not found" });
  res.json({ message: "user deleted" });
});

app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "invalid JSON" });
  res.status(500).json({ error: "server error" });
});

app.listen(PORT, () => console.log("API running on http://localhost:" + PORT));
