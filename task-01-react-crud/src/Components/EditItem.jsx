import { useEffect, useState } from "react";

export default function EditItem({ currentItem, onUpdate, onCancel }) {
  const [text, setText] = useState(currentItem.text);

  // if the user clicks edit on another item, sync the field
  useEffect(() => {
    setText(currentItem.text);
  }, [currentItem.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(currentItem.id, text);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, margin: "1rem 0" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, padding: 8 }}
      />
      <button className="edit" type="submit">Update</button>
<button className="delete" onClick={onCancel}>Cancel</button>
    </form>
  );
}

