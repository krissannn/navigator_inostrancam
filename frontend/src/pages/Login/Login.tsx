import styles from "./Styles.module.scss";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import urfu from "../../assets/urfu.svg";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../Services/auth.hooks";
import { ensureDeportationTimerForUser } from "../../utils/deportationStorage";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(t("login-form.error-invalid"));
      }

      const data: { access_token?: string } = await response.json();

      if (data.access_token) {
      const normalizedUsername = username.trim().toLowerCase();
      login(data.access_token, normalizedUsername);
      const isReEntry = localStorage.getItem(`re_entry_flag_${normalizedUsername}`) === "true";
      ensureDeportationTimerForUser(normalizedUsername, isReEntry);
    }

    navigate("/");

    } catch {
      setError(t("login-form.error-invalid"));
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.container__form} onSubmit={handleSubmit}>
        <div className={styles.container__header}>
          <h2 className={styles.container__title}>{t("button.login")}</h2>
          <Link to="/">
            <img src={urfu} className={styles.container__logo} alt="UrFU" />
          </Link>
        </div>

        {error && <div className={styles.container__error}>{error}</div>}

        <input
          className={styles.container__input}
          placeholder={t("login-form.username")}
          type="text"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          required
        />
        <input
          className={styles.container__input}
          placeholder={t("login-form.password")}
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />

        <button type="submit" className={styles.container__button}>
          {t("button.login")}
        </button>
        <p className={styles.container__footer}>
          {t("registration.question")}{" "}
          <Link className={styles.container__footer_link} to="/registration">
            {t("registration.title")}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
