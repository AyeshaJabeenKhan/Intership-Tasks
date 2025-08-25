export default function ItemList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return <p>No items yet. Add your first one!</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.text}
          <button className="edit" onClick={() => onEdit(item.id)}>Edit</button>
<button className="delete" onClick={() => onDelete(item.id)}>Delete</button>

        </li>
      ))}
    </ul>
  );
}


