import styles from "./Styles.module.scss";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router";
import urfu from "../../assets/urfu.svg";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../Services/auth.hooks";
import { ensureDeportationTimerForUser } from "../../utils/deportationStorage";
import { createLoginSchema, type LoginFormData } from "../../utils/validationSchema";



const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const schema = useMemo(() => createLoginSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (formData: LoginFormData) => {
    setServerError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: formData.username, 
          password: formData.password 
        }),
      });

      if (!response.ok) {
        throw new Error(t("login-form.error-invalid"));
      }

      const data: { access_token?: string } = await response.json();

      if (data.access_token) {
        const normalizedUsername = formData.username.trim().toLowerCase();
        login(data.access_token, normalizedUsername);
        const isReEntry = localStorage.getItem(`re_entry_flag_${normalizedUsername}`) === "true";
        ensureDeportationTimerForUser(normalizedUsername, isReEntry);
        reset(); 
        navigate("/");
      }
    } catch {
      setServerError(t("login-form.error-invalid"));
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.container__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container__header}>
          <h2 className={styles.container__title}>{t("button.login")}</h2>
          <Link to="/">
            <img src={urfu} className={styles.container__logo} alt="UrFU" />
          </Link>
        </div>

        {serverError && <div className={styles.container__error}>{serverError}</div>}

        <div className={styles.inputWrapper}>
          <input
            {...register("username")}
            className={styles.container__input}
            placeholder={t("login-form.username")}
            type="text"
          />
          {errors.username && (
            <span className={styles.fieldError}>{errors.username.message}</span>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <input
            {...register("password")}
            className={styles.container__input}
            placeholder={t("login-form.password")}
            type="password"
          />
          {errors.password && (
            <span className={styles.fieldError}>{errors.password.message}</span>
          )}
        </div>

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