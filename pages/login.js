import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "iconify-icon";

import AuthForm from "../compontens/AuthForm/AuthForm";
import MessagePopup from "../compontens/MessagePopup/MessagePopup";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { login } from "../api/login";
import LayoutAuth from "../compontens/LayoutAuth/LayoutAuth";

import style from "../styles/Auth.module.scss";

const Login = () => {
  const { t } = useTranslation('auth');
  const router = useRouter();
  const { handleChange, values, errors, isValid } = useFormAndValidation();

  const [isErrorMessaggeOpen, setIsErrorMessageOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isActiveButton, setIsActiveButton] = useState(false);

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();

    setIsActiveButton(false);

    await login(values.name, values.password)
      .then((res) => {
        if (res) {
          localStorage.setItem("username", values.name.toLowerCase());
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
        setIsActiveButton(true);
      });
  };

  useEffect(() => {
    isValid ? setIsActiveButton(true) : setIsActiveButton(false);
  }, [isValid]);

  return (
    <LayoutAuth>
      <AuthForm
        title={t("login")}
        button={t("login-button")}
        bottomLink={t("login-link")}
        bottomLinkHref="/signup"
        handleSubmitForm={handleSubmitForm}
        isActiveButton={isActiveButton}
      >
        <label className={style["input"]} htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            required
            className={style["input__field"]}
            placeholder={t("email")}
            value={values.name || ""}
            onChange={handleChange}
          />
          <span className={style["input__field-focus"]}></span>
          <iconify-icon icon="heroicons:envelope-solid"></iconify-icon>
        </label>
        <p
          className={`${style.error} ${!isValid ? style["error_active"] : ""}`}
        >
          {!isValid && errors.name}
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
          />
          <span className={style["input__field-focus"]}></span>
          <iconify-icon icon="bxs:lock-alt"></iconify-icon>
        </label>
        <p
          className={`${style.error} ${!isValid ? style["error_active"] : ""}`}
        >
          {!isValid && errors.password}
        </p>
      </AuthForm>

      <MessagePopup
        isOpen={isErrorMessaggeOpen}
        message={errorMessage}
        setIsOpen={setIsErrorMessageOpen}
      />
    </LayoutAuth>
  );
};

export default connect((state) => state)(Login);
