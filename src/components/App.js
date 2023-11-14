import { useState } from 'react'
import Logo from './Logo'
import Form from './Form'
import PackingList from './PackingList'
import Stats from './Stats'

export default function  App() {
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
