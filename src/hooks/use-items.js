import { useState } from "react"

const useItems = () => {
  const [items, setItems] = useState([])
  const [orderBy, setOrderBy] = useState("newest")

  const handleSubmitForm = (newItem) => setItems((prev) => [...prev, newItem])

  const handleClickClearList = () => setItems([])

  const handleClickDelete = (id) =>
    setItems((i) => i.filter((item) => item.id !== id))

  const handleClickCheck = (id) =>
    setItems((i) =>
      i.map((item) =>
        item.id === id ? { ...item, stored: !item.stored } : item,
      ),
    )

  const handleChangeOrder = (e) => setOrderBy(e.target.value)

  return {
    items,
    orderBy,
    handleSubmitForm,
    handleClickClearList,
    handleClickDelete,
    handleClickCheck,
    handleChangeOrder,
  }
}

export { useItems }
