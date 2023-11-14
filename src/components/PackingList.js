import { useState } from 'react'
import Item from './Item'
function PackingList({ items, onDeleteItem, onToggleItems, setItems }) {
  const [sortBy, setSortBy] = useState('input')

  let sortedItems

  if (sortBy === 'input') {
    sortedItems = items
  }

  if (sortBy === 'description') {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description))
  }

  if (sortBy === 'packed') {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed))
  }

  function handleClear() {
    const confirmed = window.confirm('Are u sure u want to delete all items')

    if (confirmed) {
      setItems([])
    }
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            onDeleteItem={onDeleteItem}
            item={item}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClear}>Clear List</button>
      </div>
    </div>
  )
}

export default PackingList
