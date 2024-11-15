import localforage from "localforage"
import { useState, useEffect } from "react"

const useItems = () => {
  const [items, setItems] = useState([])
  const [orderBy, setOrderBy] = useState("newest")

  useEffect(() => {
    localforage
      .setItem("saveThings", items)
      .catch((error) => alert(error.message))
  }, [items])

  useEffect(() => {
    localforage
      .getItem("saveThings")
      .then((value) => {
        if (value) {
          setItems(value)
        }
      })
      .catch((error) => alert(error.message))
  }, [])

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
