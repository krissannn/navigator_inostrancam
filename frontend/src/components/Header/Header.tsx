import Select from "../Select/Select"
import styles from "./Styles.module.scss"
import { Link } from 'react-router'

function Header({setLanguage}: {setLanguage: (language: string) => void}) {


  return (
    <header className={styles.header}>
      <Select setLanguage={setLanguage} />
      <Link className={styles.header__link} to="/login">   
        <button className={styles.header__button} type="button">Войти</button>
      </Link>

    </header>
  )
}

export default Header