import { use, useState, type FormEvent } from "react"
import styles from "./Styles.module.scss"
import { useNavigate } from "react-router"

const API_URL = import.meta.env.VITE_API_URL

function Registration() {

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [country, setCountry] = useState<string>("")

  const navigate = useNavigate()


  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    try {
      const response = await fetch(`${API_URL}/auth/register`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, name, password})
        }
      )

      if (!response.ok) throw new Error('Error!!!!!')
      navigate("/login")
    }

    catch(err) {
      console.log("Something went wrong!")
    }

    finally {
      setName("")
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
          <img src='../../../src/assets/urfu.svg' className={styles.container__logo} alt="logo" />
        </div>

        <input 
          className={styles.container__input}
          placeholder='Имя'
          type="text"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
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