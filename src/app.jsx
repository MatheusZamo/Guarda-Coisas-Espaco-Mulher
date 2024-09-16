import { useState } from "react"

const App = () => {
  const [itens, setItens] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    const selectValue = e.target.quantidade.value
    const inputValue = e.target.item.value

    setItens((i) => [
      ...i,
      {
        id: crypto.randomUUID(),
        quantify: selectValue,
        name: inputValue,
      },
    ])

    e.target.reset()
  }

  return (
    <>
      <header className="header">
        <img
          src="./public/imgs/logo-espaco-mulher.png"
          alt="logo espaço da mulher"
          className="logo"
        />
        <h1 className="title">Espaço Mulher</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <label className="label">O que você precisa guardar ?</label>
        <select name="quantidade">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <input name="item" placeholder="Manda aqui" />
        <button>Adicionar</button>
      </form>

      <ul className="itensGuardados">
        {itens.map(({ id, quantify, name }) => (
          <li key={id}>
            {quantify} {name}
          </li>
        ))}
      </ul>
    </>
  )
}

export { App }
