import styles from './Styles.module.scss'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'

function Login() {

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    
    try {
      const response = await fetch("https://navigator-api-vsxn.onrender.com/api/auth/login",
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({login, password})
      }
      )

      if (!response.ok) throw new Error("Error")
      navigate("/")
    }
  catch(err) {
    console.log('Incorrect username or password')
  }
  finally {
    setLogin("")
    setPassword("")
  }
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
        <p className={styles.container__footer}>Нет аккаунта? <Link className={styles.container__footer_link} to="/registration">Регистрация</Link></p>

      </form>
    </div>
  )
}

export default Login