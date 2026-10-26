import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx";

// Read saved tasks from the browser. If nothing is saved, start with an empty list.
function loadTasks() {
  try {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

export default function App() {
  // State: the list of tasks and the current filter
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("all"); // "all", "active" or "done"

  // Save the tasks every time the list changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ADD a new task
  function addTask(text) {
    const newTask = { id: Date.now(), text: text, done: false };
    setTasks([newTask, ...tasks]);
  }

  // EDIT the text of a task
  function editTask(id, newText) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  }

  // DELETE a task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Mark a task as done or not done
  function toggleTask(id) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  }

  // Remove all finished tasks
  function clearDone() {
    setTasks(tasks.filter((task) => !task.done));
  }

  // Choose which tasks to show
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  const leftCount = tasks.filter((task) => !task.done).length;
  const doneCount = tasks.length - leftCount;

  return (
    <main className="app">
      <h1>My To-Do List</h1>
      <p className="subtitle">Add, edit and delete your tasks.</p>

      <TodoForm onAdd={addTask} />

      <div className="filters" role="group" aria-label="Filter tasks">
        {["all", "active", "done"].map((name) => (
          <button
            key={name}
            type="button"
            className={filter === name ? "filter active" : "filter"}
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name === "all" ? "All" : name === "active" ? "Active" : "Done"}
          </button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <p className="empty">
          {tasks.length === 0 ? "No tasks yet. Add your first task above." : "No tasks in this view."}
        </p>
      ) : (
        <ul className="list">
          {visibleTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={editTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}

      <footer className="footer">
        <span>{leftCount} left</span>
        {doneCount > 0 && (
          <button type="button" className="link-btn" onClick={clearDone}>
            Clear done ({doneCount})
          </button>
        )}
      </footer>
    </main>
  );
}
