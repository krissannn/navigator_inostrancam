import { useState, type FormEvent } from "react"
import styles from "./Styles.module.scss"
import { Link, useNavigate } from "react-router"
import { authService } from "../../Services/auth.service"

const API_URL = import.meta.env.VITE_API_URL

function Registration() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [country, setCountry] = useState("")
  const [error, setError] = useState("") 
  const navigate = useNavigate()

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setError("")

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, username, password})
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.detail.msg === "Incorrect username or password") {
          throw new Error("Некорректное имя пользователя или пароль")
        }
        else {
          throw new Error(errorData.detail.msg || 'Ошибка регистрации')
        }
      }

      const data = await response.json()

      if (data.access_token) {
        authService.setToken(data.access_token)
        navigate("/") 
      } else {
        navigate("/login")
      }
    } catch(err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации')
      console.log(err)
    } finally {
      setUsername("")
      setEmail("")
      setPassword("")
      setCountry("")
    }
  }
  
  return (
    <div className={styles.container}>
      <form className={styles.container__form} onSubmit={handleSubmit}>
        <div className={styles.container__header}>
          <h2 className={styles.container__title}>Регистрация</h2>
          <Link to={"/"}><img src='../../../src/assets/urfu.svg' className={styles.container__logo} alt="logo" /></Link>
        </div>

        <input 
          className={styles.container__input}
          placeholder='Имя'
          type="text"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          required 
        />
        <input 
          className={styles.container__input} 
          placeholder='Email'
          type="text"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
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
        <input 
          className={styles.container__input}
          placeholder='Страна'
          type="text"
          value={country}
          onChange={(evt) => setCountry(evt.target.value)}
          required 
        />
 
        <button type='submit' className={styles.container__button}>Зарегистрироваться</button>

      </form>
    </div>
)}

export default Registration