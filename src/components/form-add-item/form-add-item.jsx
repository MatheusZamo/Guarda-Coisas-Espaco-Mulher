import { useState } from "react"
import styles from "./form-add-item.module.css"

const ids = Array.from({ length: 20 }, () => crypto.randomUUID())

const FormAddItem = ({ onSubmitItem }) => {
  const [inputValue, setInputValue] = useState("")
  const [selectValue, setSelectValue] = useState("1")

  const handleChangeInput = (e) => setInputValue(e.target.value)
  const handleChangeSelect = (e) => setSelectValue(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmitItem({
      id: crypto.randomUUID(),
      quantify: +selectValue,
      name: inputValue,
      stored: false,
    })

    setInputValue("")
    setSelectValue("1")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>O que você precisa guardar ?</label>
      <select value={selectValue} onChange={handleChangeSelect}>
        {ids.map((id, index) => (
          <option key={id} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <input
        placeholder="Manda aqui"
        autoFocus
        value={inputValue}
        onChange={handleChangeInput}
      />
      <button className={styles.add}>Adicionar</button>
    </form>
  )
}

export { FormAddItem }
