import { useState } from "react"

const ids = Array.from({ length: 20 }, () => crypto.randomUUID())

const App = () => {
  const [itens, setItens] = useState([])

  const handleClickFilters = (value) => {
    if (value === 2) {
      setItens((i) => i.filter((item) => item.stored))
    }
  }

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

  return (
    <>
      <header className="header">
        <img
          src="./public/logo-espaco-mulher.png"
          alt="logo espaço da mulher"
          className="logo"
        />
        <h1 className="title">Espaço Mulher</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <label className="label">O que você precisa guardar ?</label>
        <select name="quantidade">
          {ids.map((id, index) => (
            <option key={id} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <input name="item" placeholder="Manda aqui" />
        <button className="add">Adicionar</button>
      </form>

      <ul className="itensGuardados">
        {itens.map(({ id, quantify, name, stored }) => (
          <li key={id}>
            <input
              type="checkbox"
              className="checkbox"
              checked={stored}
              onChange={() => handleClickCheck(id)}
            />
            <span className={stored ? "line-through" : ""}>
              {quantify} {name}
            </span>
            <button className="close" onClick={() => handleClickDelete(id)}>
              ✖️
            </button>
          </li>
        ))}
      </ul>
      <div className="filtros">
        <select
          name="filtro"
          className="filtro"
          onChange={(e) => handleClickFilters(+e.target.value)}
        >
          <option value="1">Ordenar por mais recente</option>
          <option value="2">Mostrar guardados</option>
          <option value="3">Ordem alfabética</option>
        </select>
        <button className="clearList">Limpar lista</button>
      </div>
    </>
  )
}

export { App }
