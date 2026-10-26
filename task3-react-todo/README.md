# Task 3: Front-End Framework Basics (React To-Do App)

A small to-do app built with React and Vite.

## Features
- Add a task
- Edit a task (Save, Cancel, Enter and Escape keys work)
- Delete a task
- Mark tasks as done, filter by All / Active / Done
- Tasks are saved in the browser (localStorage), so they stay after refresh

## React ideas used
- Components: `App`, `TodoForm`, `TodoItem`
- Props to pass data and functions between components
- `useState` for the task list, filter and edit mode
- `useEffect` to save tasks to localStorage
- Lists with `map` and `key`

## How to run
You need Node.js installed.

```
npm install
npm run dev
```

Then open the link shown in the terminal (usually http://localhost:5173).
