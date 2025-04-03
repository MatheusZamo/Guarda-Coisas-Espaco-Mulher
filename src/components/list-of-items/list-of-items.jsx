import styles from "./list-of-items.module.css"

const ListOfItems = ({ orderBy, items, onClickCheck, onClickDelete }) => {
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
            className={styles.checkbox}
            checked={stored}
            onChange={() => onClickCheck(id)}
          />
          <span className={stored ? styles.linethrough : ""}>
            {quantify} - {name}
          </span>
          <button className={styles.close} onClick={() => onClickDelete(id)}>
            ✖️
          </button>
        </li>
      ))}
    </ul>
  )
}

export { ListOfItems }
