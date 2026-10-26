import { useState } from "react";

// The box at the top where the user types a new task
export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading
    const clean = text.trim();

    if (clean === "") {
      setError("Please type a task first.");
      return;
    }

    onAdd(clean);
    setText("");
    setError("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="newTask" className="visually-hidden">New task</label>
        <input
          id="newTask"
          type="text"
          value={text}
          placeholder="What do you need to do?"
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit" className="btn-main">Add</button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
    </form>
  );
}
