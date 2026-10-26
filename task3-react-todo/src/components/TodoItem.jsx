import { useState } from "react";

// One task in the list. It has two modes: normal and editing.
export default function TodoItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  function save() {
    const clean = draft.trim();
    if (clean === "") return; // do not save an empty task
    onEdit(task.id, clean);
    setEditing(false);
  }

  function cancel() {
    setDraft(task.text);
    setEditing(false);
  }

  // Editing mode
  if (editing) {
    return (
      <li className="item">
        <input
          className="edit-input"
          value={draft}
          autoFocus
          aria-label="Edit task"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") save();
            if (event.key === "Escape") cancel();
          }}
        />
        <button type="button" className="btn-small" onClick={save}>Save</button>
        <button type="button" className="btn-small btn-plain" onClick={cancel}>Cancel</button>
      </li>
    );
  }

  // Normal mode
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={task.done}
        aria-label={"Mark done: " + task.text}
        onChange={() => onToggle(task.id)}
      />
      <span className={task.done ? "text done" : "text"}>{task.text}</span>
      <button type="button" className="btn-small btn-plain" onClick={() => setEditing(true)}>Edit</button>
      <button type="button" className="btn-small btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}
