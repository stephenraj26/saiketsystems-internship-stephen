# Task 4: Basic REST API (Node.js and Express)

CRUD endpoints for a "User" with name, email and age. Data is kept in memory,
so it resets when the server restarts (the database comes in Task 5).

## Run it
```
npm install
npm start
```
The server runs at http://localhost:3000.

## Test with Postman
Import `postman_collection.json` into Postman, or send these requests yourself.

| Method | URL | Body (JSON) |
|---|---|---|
| POST | /users | `{ "name": "Stephen Raj", "email": "stephen@example.com", "age": 22 }` |
| GET | /users | none |
| GET | /users/1 | none |
| PUT | /users/1 | `{ "name": "Stephen R", "email": "stephen@example.com", "age": 23 }` |
| DELETE | /users/1 | none |

Status codes used: 200, 201, 400 (bad data), 404 (not found), 409 (email exists).
