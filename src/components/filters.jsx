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

export { Filters }
