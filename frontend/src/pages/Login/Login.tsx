import styles from './Styles.module.scss'
import { useState, type FormEvent } from 'react'

function LoginComponent() {

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    console.log(login)
    console.log(password)
  }

  return (
    <div className={styles.container}>
      <form className={styles.container__form} onSubmit={handleSubmit}>
        <div className={styles.container__header}>
          <h2 className={styles.container__title}>Вход</h2>
          <img src='../../../src/assets/urfu.svg' className={styles.container__logo} alt="logo" />
        </div>

        <input 
          className={styles.container__input} 
          placeholder='Логин'
          type="text"
          value={login}
          onChange={(evt) => setLogin(evt.target.value)}
          required 
        />
        <input 
          className={styles.container__input}
          placeholder='Пароль'
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          required 
        />

        <button type='submit' className={styles.container__button}>Войти</button>
      </form>
    </div>
  )
}

export const Login = LoginComponent