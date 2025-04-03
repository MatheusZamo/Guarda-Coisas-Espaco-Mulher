import styles from "./filters.module.css"

const Filters = ({ orderBy, onChangeOrder, onClickClearList }) => (
  <div className={styles.actions}>
    <select value={orderBy} className={styles.filter} onChange={onChangeOrder}>
      <option value="newest">Ordenar por mais recente</option>
      <option value="stored">Mostrar guardados</option>
      <option value="alphabetically">Ordem alfabética</option>
    </select>
    <button className={styles.clearList} onClick={onClickClearList}>
      Limpar lista
    </button>
  </div>
)

export { Filters }
