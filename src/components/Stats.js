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

export default Stats
