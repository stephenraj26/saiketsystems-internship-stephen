# Task 6: Full Stack Application (User Management System)

A simple User Management System. Users can add, view, update and delete profiles.
The front end shows data from the back end and the database.

## Built with
- Front end: HTML, CSS, JavaScript (fetch API)
- Back end: Node.js and Express
- Database: SQLite (file `users.db`, created automatically)

## Run it
You need Node.js installed.

```
npm install
npm start
```

Open http://localhost:3000 in your browser.

## API (used by the front end)
| Method | URL | What it does |
|---|---|---|
| GET | /api/users | List all users |
| GET | /api/users/:id | Get one user |
| POST | /api/users | Add a user (name, email, age) |
| PUT | /api/users/:id | Update a user |
| DELETE | /api/users/:id | Delete a user |

Checks: name needs 2+ letters, email must be valid and unique, age is a whole number from 0 to 120.
