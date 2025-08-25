import { useEffect, useState } from "react";
import AddItem from "./Components/AddItem";
import ItemList from "./Components/ItemList";
import EditItem from "./Components/EditItem";

export default function App() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const makeId = () =>
    (typeof crypto !== "undefined" && crypto.randomUUID)
      ? crypto.randomUUID()
      : String(Date.now());

  // Create
  const addItem = (text) => {
    const value = text.trim();
    if (!value) return;
    setItems(prev => [...prev, { id: makeId(), text: value }]);
  };

  // Edit state
  const startEdit = (id) => setEditingId(id);
  const cancelEdit = () => setEditingId(null);

  // Update
  const updateItem = (id, newText) => {
    const value = newText.trim();
    if (!value) return;
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, text: value } : item))
    );
    setEditingId(null);
  };

  // Delete
  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("items");
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to read items", e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("items", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save items", e);
    }
  }, [items]);

  const currentItem = items.find(i => i.id === editingId) || null;

  // ✅ Updated JSX with className="container"
  return (
  <div className="container">
    <h1>React CRUD (Local State)</h1>
    <AddItem onAdd={addItem} />
    {currentItem ? (
      <EditItem
        currentItem={currentItem}
        onUpdate={updateItem}
        onCancel={cancelEdit}
      />
    ) : (
      <ItemList items={items} onEdit={startEdit} onDelete={deleteItem} />
    )}
  </div>
)
}
