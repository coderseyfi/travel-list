import { useState } from 'react'

export default function App() {
  const [items, setItems] = useState([])

  function onAddItems(newItem) {
    setItems(() => [...items, newItem])
  }

  function handleDeleteItem(id) {
    setItems(() => items.filter((item) => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={onAddItems} />
      <PackingList
        onDeleteItem={handleDeleteItem}
        items={items}
        setItems={setItems}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  )
}

function Logo() {
  return <h1>🌴 Far Away 🥥</h1>
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()

    if (!description) return

    const newItem = { description, quantity, packed: false, id: Date.now() }
    // console.log(newItem) //Date.now() we get random id

    onAddItems(newItem)

    setDescription('') //in here we reset the state
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🤑 trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Item..."
      />
      <button>Add</button>
    </form>
  )
}

function PackingList({ items, onDeleteItem, onToggleItems, setItems }) {
  const [sortBy, setSortBy] = useState('input')
  const [clear, setClear] = useState([])

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

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    )
  }

  const numItems = items.length
  const packedLen = items.filter((item) => item.packed).length
  const totalPer = Math.round((packedLen / numItems) * 100)
  console.log(totalPer)

  return (
    <footer className="stats">
      <em>
        {totalPer === 100
          ? 'You got everything? Ready to go ✈️'
          : `💼 You have ${numItems} items on ur list and you already packed ${packedLen} (${totalPer}%)`}
      </em>
    </footer>
  )
}
