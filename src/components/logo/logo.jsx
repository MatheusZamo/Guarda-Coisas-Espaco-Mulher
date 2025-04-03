import styles from "./logo.module.css"

const Logo = () => (
  <header className={styles.header}>
    <img
      src="logo-espaco-mulher.png"
      alt="logo espaço da mulher"
      className={styles.logo}
    />
    <h1 className={styles.title}>Espaço Mulher</h1>
  </header>
)

export { Logo }
