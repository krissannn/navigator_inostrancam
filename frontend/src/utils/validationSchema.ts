import * as yup from "yup";

type TranslationFunction = (...args: any[]) => string;

export const createRegisterSchema = (t: TranslationFunction) => {
  return yup.object().shape({
    username: yup
      .string()
      .required(t("registration-form.validation.username-required")),
    email: yup
      .string()
      .email(t("registration-form.validation.email-invalid"))
      .required(t("registration-form.validation.email-required")),
    password: yup
      .string()
      .min(6, t("registration-form.validation.password-min"))
      .required(t("registration-form.validation.password-required")),
    country: yup
      .string()
      .required(t("registration-form.validation.country-required")),
  });
};

export type RegisterFormData = yup.InferType<ReturnType<typeof createRegisterSchema>>;

export const createLoginSchema = (t: TranslationFunction) => {
  return yup.object().shape({
    username: yup
      .string()
      .required(t("login-form.validation.username-required", "Логин обязателен")),
    password: yup
      .string()
      .required(t("login-form.validation.password-required", "Пароль обязателен")),
  });
};

export type LoginFormData = yup.InferType<ReturnType<typeof createLoginSchema>>;