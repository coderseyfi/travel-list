function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li className="">
      <input
        type="checkbox"
        value={item}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}
export default Item
