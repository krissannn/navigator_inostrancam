import styles from './Styles.module.scss'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { authService } from '../../Services/auth.service'
import urfu from '../../assets/urfu.svg'

const API_URL = import.meta.env.VITE_API_URL

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("") 

  const navigate = useNavigate()

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setError("")
    
    try {
      const response = await fetch(`${API_URL}/auth/login`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail.msg === "Incorrect username or password" ? "Неверный логин или пароль": "")
      }

      const data = await response.json()
      
      if (data.access_token) {
        authService.setToken(data.access_token)
        console.log("Токен успешно сохранен")
      }

      navigate("/")
    }
    catch(err) {
      setError("Неверный логин или пароль")
      console.log('Error:', err)
    }
    finally {
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.container__form} onSubmit={handleSubmit}>
        <div className={styles.container__header}>
          <h2 className={styles.container__title}>Вход</h2>
          <Link to={"/"}><img src={urfu} className={styles.container__logo} alt="logo" /></Link>
        </div>

        {error && <div className={styles.container__error}>{error}</div>}

        <input 
          className={styles.container__input} 
          placeholder='Логин'
          type="text"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
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