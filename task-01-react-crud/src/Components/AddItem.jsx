import { useState } from "react";

export default function AddItem({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", margin: "1rem 0" }}>
      <input
        type="text"
        placeholder="Enter item"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
      />
      <button className="add" type="submit">Add</button>

    </form>
  );
}


