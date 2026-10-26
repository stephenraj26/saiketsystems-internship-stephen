# Task 5: Database Integration

The REST API from Task 4, now connected to a SQL database (SQLite). User data is stored in
`users.db` and read or changed with SQL queries inside each endpoint.

## Run it
```
npm install
npm start
```
The server runs at http://localhost:3000 and creates the `users` table from `schema.sql`.

## Endpoints
| Method | URL | What it does |
|---|---|---|
| GET | /users | List all users |
| GET | /users/:id | Get one user |
| POST | /users | Add a user |
| PUT | /users/:id | Update a user |
| DELETE | /users/:id | Delete a user |

Example body for POST and PUT:
```json
{ "name": "Stephen Raj", "email": "stephen@example.com", "age": 22 }
```

## Notes
- SQL queries use `?` placeholders (safe from SQL injection).
- Email must be unique. A duplicate returns status 409.
