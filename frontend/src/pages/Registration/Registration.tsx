import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Styles.module.scss";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import urfu from "../../assets/urfu.svg";
import { useAuth } from "../../Services/auth.hooks";
import { ensureDeportationTimerForUser } from "../../utils/deportationStorage";
import { createRegisterSchema, type RegisterFormData } from "../../utils/validationSchema";


const API_URL = import.meta.env.VITE_API_URL;

function Registration() {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Инициализируем схему внутри useMemo, чтобы она обновлялась при смене языка (t)
  const schema = useMemo(() => createRegisterSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      country: "",
    },
  });

  const onSubmit = async (formData: RegisterFormData) => {
    setServerError("");

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          country: formData.country, 
        }),
      });

      if (!response.ok) {
        const errorData: { detail?: { msg?: string } } = await response.json();
        if (errorData.detail?.msg === "Incorrect username or password") {
          throw new Error(t("registration-form.error-invalid"));
        }
        throw new Error(errorData.detail?.msg || t("registration-form.error"));
      }

      const data: { access_token?: string } = await response.json();

      if (data.access_token) {
        login(data.access_token, formData.username.trim().toLowerCase());
        ensureDeportationTimerForUser(formData.username.trim().toLowerCase());
        reset();
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : t("registration-form.error")
      );
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.container__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container__header}>
          <h2 className={styles.container__title}>
            {t("registration-form.title")}
          </h2>
          <Link to="/">
            <img src={urfu} className={styles.container__logo} alt="UrFU" />
          </Link>
        </div>

        {serverError && <div className={styles.container__error}>{serverError}</div>}

        <div className={styles.inputWrapper}>
          <input
            {...register("username")}
            className={styles.container__input}
            placeholder={t("registration-form.name")}
            type="text"
          />
          {errors.username && (
            <span className={styles.fieldError}>{errors.username.message}</span>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <input
            {...register("email")}
            className={styles.container__input}
            placeholder={t("registration-form.email")}
            type="email"
          />
          {errors.email && (
            <span className={styles.fieldError}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <input
            {...register("password")}
            className={styles.container__input}
            placeholder={t("registration-form.password")}
            type="password"
          />
          {errors.password && (
            <span className={styles.fieldError}>{errors.password.message}</span>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <input
            {...register("country")}
            className={styles.container__input}
            placeholder={t("registration-form.country")}
            type="text"
          />
          {errors.country && (
            <span className={styles.fieldError}>{errors.country.message}</span>
          )}
        </div>

        <button type="submit" className={styles.container__button}>
          {t("registration-form.btn-title")}
        </button>
      </form>
    </div>
  );
}

export default Registration;