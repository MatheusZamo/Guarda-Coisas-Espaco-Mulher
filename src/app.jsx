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

const ListOfitems = ({ orderBy, items, onClickCheck, onClickDelete }) => {
  const sortedItems =
    orderBy === "stored"
      ? items.filter((item) => item.stored)
      : orderBy === "alphabetically"
      ? items.toSorted((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
        )
      : items

  return (
    <ul>
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
}

const Filters = ({ orderBy, onChangeOrder, onClickClearList }) => (
  <div className="actions">
    <select value={orderBy} className="filter" onChange={onChangeOrder}>
      <option value="newest">Ordenar por mais recente</option>
      <option value="stored">Mostrar guardados</option>
      <option value="alphabetically">Ordem alfabética</option>
    </select>
    <button className="clearList" onClick={onClickClearList}>
      Limpar lista
    </button>
  </div>
)

const Stats = ({ items }) => {
  const storedItems = items.reduce(
    (acc, item) => (item.stored ? acc + 1 : acc),
    0,
  )
  const storedPercentage =
    items.length === 0 ? 0 : ((storedItems / items.length) * 100).toFixed(0)
  const singularPlural = items.length === 1 ? "item" : "itens"

  return (
    <footer>
      <p>
        {`Você tem ${items.length} ${singularPlural} na lista`}
        {items.length > 0 && (
          <span>
            {" "}
            e já guardou {storedItems} ({storedPercentage}%)
          </span>
        )}
      </p>
    </footer>
  )
}

const App = () => {
  const [items, setItems] = useState([])
  const [orderBy, setOrderBy] = useState("newest")

  const handleClickClearList = () => setItems(() => [])

  const handleClickDelete = (id) =>
    setItems((i) => i.filter((item) => item.id !== id))

  const handleClickCheck = (id) =>
    setItems((i) =>
      i.map((item) =>
        item.id === id ? { ...item, stored: !item.stored } : item,
      ),
    )

  const handleSubmit = (e) => {
    e.preventDefault()

    const selectValue = e.target.quantidade.value
    const inputValue = e.target.item.value

    setItems((i) => [
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

  return (
    <>
      <Header />
      <FormAddItem onHandleSubmit={handleSubmit} />
      <ListOfitems
        orderBy={orderBy}
        items={items}
        onClickCheck={handleClickCheck}
        onClickDelete={handleClickDelete}
      />
      <Filters
        orderBy={orderBy}
        onChangeOrder={handleChangeOrder}
        onClickClearList={handleClickClearList}
      />
      <Stats items={items} />
    </>
  )
}

export { App }
