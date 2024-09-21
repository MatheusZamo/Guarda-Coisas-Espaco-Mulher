import { useState } from "react"

const ids = Array.from({ length: 20 }, () => crypto.randomUUID())

const Header = () => (
  <header className="header">
    <img
      src="./public/logo-espaco-mulher.png"
      alt="logo espaço da mulher"
      className="logo"
    />
    <h1 className="title">Espaço Mulher</h1>
  </header>
)

const FormAddItem = ({ onHandleSubmit }) => (
  <form onSubmit={onHandleSubmit}>
    <label className="label">O que você precisa guardar ?</label>
    <select name="quantidade">
      {ids.map((id, index) => (
        <option key={id} value={index + 1}>
          {index + 1}
        </option>
      ))}
    </select>
    <input name="item" placeholder="Manda aqui" autoFocus />
    <button className="add">Adicionar</button>
  </form>
)

const ListOfItems = ({ sortedItems, onClickCheck, onClickDelete }) => (
  <ul className="itensGuardados">
    {sortedItems.map(({ id, quantify, name, stored }) => (
      <li key={id}>
        <input
          type="checkbox"
          className="checkbox"
          checked={stored}
          onChange={() => onClickCheck(id)}
        />
        <span className={stored ? "line-through" : ""}>
          {quantify} {name}
        </span>
        <button className="close" onClick={() => onClickDelete(id)}>
          ✖️
        </button>
      </li>
    ))}
  </ul>
)

const Filters = ({ orderBy, onChangeOrder }) => (
  <select value={orderBy} className="filter" onChange={onChangeOrder}>
    <option value="newest">Ordenar por mais recente</option>
    <option value="stored">Mostrar guardados</option>
    <option value="3">Ordem alfabética</option>
  </select>
)

const App = () => {
  const [itens, setItens] = useState([])
  const [orderBy, setOrderBy] = useState("newest")

  const handleClickClearList = () => setItens(() => [])

  const handleClickDelete = (id) =>
    setItens((i) => i.filter((item) => item.id !== id))

  const handleClickCheck = (id) =>
    setItens((i) =>
      i.map((item) =>
        item.id === id ? { ...item, stored: !item.stored } : item,
      ),
    )

  const handleSubmit = (e) => {
    e.preventDefault()

    const selectValue = e.target.quantidade.value
    const inputValue = e.target.item.value

    setItens((i) => [
      ...i,
      {
        id: crypto.randomUUID(),
        quantify: +selectValue,
        name: inputValue,
        stored: false,
      },
    ])

    e.target.reset()
  }

  const handleChangeOrder = (e) => setOrderBy(e.target.value)

  const sortedItems =
    orderBy === "stored" ? itens.filter((item) => item.stored) : itens

  return (
    <>
      <Header />
      <FormAddItem onHandleSubmit={handleSubmit} />
      <ListOfItems
        sortedItems={sortedItems}
        onClickCheck={handleClickCheck}
        onClickDelete={handleClickDelete}
      />

      <div className="actions">
        <Filters orderBy={orderBy} onChangeOrder={handleChangeOrder} />
        <button className="clearList" onClick={handleClickClearList}>
          Limpar lista
        </button>
      </div>
      <footer>
        Você tem {itens.length} itens na lista e já guardou {} (??%)
      </footer>
    </>
  )
}

export { App }
