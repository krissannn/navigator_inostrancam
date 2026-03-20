
import classes from './Header.module.css'

function Header() {
  return (
    <header className={classes.header}>
      <h1 className={classes.title}>Навигатор для иностранных студентов</h1>
      <h3 className={classes.subtitle}>Пошаговое руководство по адаптации в России</h3>
    </header>
  )
}

export default Header