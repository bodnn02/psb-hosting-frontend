import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import "iconify-icon";

import AuthForm from "../compontens/AuthForm/AuthForm";
import MessagePopup from "../compontens/MessagePopup/MessagePopup";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { signup } from "../api/signup";
import { login } from "../api/login";
import LayoutAuth from "../compontens/LayoutAuth/LayoutAuth";
import {
  CYRILLIC_REG_EXP,
  EMAIL_REG_EXP,
  NUMBER_REG_EXP,
} from "../utils/constants";

import style from "../styles/Auth.module.scss";

export default function SignUp() {
  const { t } = useTranslation('auth');
  const router = useRouter();
  const formRef = useRef();
  const { handleChange, values, isValid, errors, setIsValid } =
    useFormAndValidation();

  const [isErrorMessaggeOpen, setIsErrorMessageOpen] = useState(false);
  const [errorPasswordRepeat, setErrorPasswordRepeat] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorOnlyNumbers, setErrorOnlyNumbers] = useState("");
  const [errorCyrillicName, setErrorCyrilycName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();

    setIsSuccess(true);
    setErrorMessage(t("error-pending-signup"));
    setIsErrorMessageOpen(true);
    setIsActiveButton(false);

    const formData = new FormData(formRef.current);
    const token = formData.get("cf-turnstile-response");

    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res) {
      submitForm();
    } else {
      setIsErrorMessageOpen(true);
      setIsSuccess(false);
      setIsActiveButton(true);
      setErrorMessage(t("error"));
    }
  };

  const submitForm = () => {
    signup(values.name, values.email, values.password)
      .then((res) => {
        if (res) {
          login(values.email, values.password)
            .then((res) => {
              if (res) {
                localStorage.setItem("username", values.email.toLowerCase());
                localStorage.setItem("token", res.access_token);
                router.push("/account");
              }
            })
            .catch((err) => {
              setErrorMessage(
                `${
                  err.includes("400") || err.includes("422")
                    ? t("error-login")
                    : t("error")
                }`
              );
              setIsErrorMessageOpen(true);
              setIsSuccess(false);
              setIsActiveButton(true);
            });
        }
      })
      .catch((err) => {
        if (typeof err === "object") {
          setErrorMessage(`${err}`);
        } else {
          if (err.includes("400")) {
            setErrorMessage(`${t("error-user")}`);
          } else {
            setErrorMessage(`${err}`);
          }
        }
        setIsSuccess(false);
        setIsErrorMessageOpen(true);
        setIsActiveButton(true);
      });
  };

  useEffect(() => {
    isValid ? setIsActiveButton(true) : setIsActiveButton(false);
  }, [isValid]);

  useEffect(() => {
    if (values.password !== values.repeatPassword) {
      setIsValid(false);
      setErrorPasswordRepeat(t("error-passwords-not-match"));
    } else if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.repeatPassword &&
      !errorCyrillicName &&
      errorPasswordRepeat &&
      !errorEmail &&
      !errorOnlyNumbers
    ) {
      setIsValid(true);
      setErrorPasswordRepeat("");
    } else {
      setErrorPasswordRepeat("");
    }

    if (values.name && values.name.match(CYRILLIC_REG_EXP)) {
      setIsValid(false);
      setErrorCyrilycName(t("error-name"));
    } else if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.repeatPassword &&
      errorCyrillicName &&
      !errorPasswordRepeat &&
      !errorEmail &&
      !errorOnlyNumbers
    ) {
      setIsValid(true);
      setErrorCyrilycName("");
    } else {
      setErrorCyrilycName("");
    }

    if (values.email && !EMAIL_REG_EXP.test(values.email)) {
      setIsValid(false);
      setErrorEmail(t("error-email"));
    } else if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.repeatPassword &&
      !errorCyrillicName &&
      !errorPasswordRepeat &&
      errorEmail &&
      !errorOnlyNumbers
    ) {
      setIsValid(true);
      setErrorEmail("");
    } else {
      setErrorEmail("");
    }

    if (values.password && NUMBER_REG_EXP.test(values.password)) {
      setIsValid(false);
      setErrorOnlyNumbers(t("error-numbers"));
    } else if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.repeatPassword &&
      !errorCyrillicName &&
      !errorPasswordRepeat &&
      !errorEmail &&
      errorOnlyNumbers
    ) {
      setIsValid(true);
      setErrorOnlyNumbers("");
    } else {
      setErrorOnlyNumbers("");
    }
  }, [values.name, values.email, values.password, values.repeatPassword]);

  return (
    <LayoutAuth>
      <AuthForm
        title={t("signup")}
        button={t("signup-button")}
        bottomLink={t("signup-link")}
        bottomLinkHref="/login"
        handleSubmitForm={handleSubmitForm}
        isActiveButton={isActiveButton}
        formRef={formRef}
      >
        <label className={style["input"]} htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            required
            className={style["input__field"]}
            placeholder={t("name")}
            value={values.name || ""}
            onChange={handleChange}
          />
          <span className={style["input__field-focus"]}></span>
          <iconify-icon icon="ri:user-fill"></iconify-icon>
        </label>
        <p
          className={`${style.error} ${!isValid ? style["error_active"] : ""}`}
        >
          {errorCyrillicName ? errorCyrillicName : !isValid && errors.name}
        </p>
        <label className={style["input"]} htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            required
            className={style["input__field"]}
            placeholder={t("email")}
            value={values.email || ""}
            onChange={handleChange}
          />
          <span className={style["input__field-focus"]}></span>
          <iconify-icon icon="heroicons:envelope-solid"></iconify-icon>
        </label>
        <p
          className={`${style.error} ${!isValid ? style["error_active"] : ""}`}
        >
          {errorEmail ? errorEmail : !isValid && errors.email}
        </p>
        <label className={style["input"]} htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            required
            className={style["input__field"]}
            placeholder={t("password")}
            value={values.password || ""}
            onChange={handleChange}
            minLength="8"
          />
          <span className={style["input__field-focus"]}></span>
          <iconify-icon icon="bxs:lock-alt"></iconify-icon>
        </label>
        <p
          className={`${style.error} ${!isValid ? style["error_active"] : ""}`}
        >
          {errorOnlyNumbers ? errorOnlyNumbers : !isValid && errors.password}
        </p>
        <label className={style["input"]} htmlFor="repeat-password">
          <input
            type="password"
            name="repeatPassword"
            id="repeat-password"
            required
            className={style["input__field"]}
            placeholder={t("password-repeat")}
            value={values.repeatPassword || ""}
            onChange={handleChange}
            minLength="8"
          />
          <span className={style["input__field-focus"]}></span>
          <iconify-icon icon="bxs:lock-alt"></iconify-icon>
        </label>
        <p
          className={`${style.error} ${!isValid ? style["error_active"] : ""}`}
        >
          {errorPasswordRepeat
            ? errorPasswordRepeat
            : !isValid
            ? errors.repeatPassword
            : ""}
        </p>
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
          options={{
            action: "submit-form",
          }}
        />
      </AuthForm>

      <MessagePopup
        isOpen={isErrorMessaggeOpen}
        message={errorMessage}
        setIsOpen={setIsErrorMessageOpen}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
      />
    </LayoutAuth>
  );
}
