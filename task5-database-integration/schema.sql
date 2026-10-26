-- Table used by the API (created automatically when the server starts)
CREATE TABLE IF NOT EXISTS users (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT    NOT NULL,
  email TEXT    NOT NULL UNIQUE,
  age   INTEGER NOT NULL CHECK (age >= 0 AND age <= 120)
);
