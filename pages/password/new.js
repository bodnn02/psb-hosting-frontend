import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "iconify-icon";

import LayoutAuth from "../../compontens/LayoutAuth/LayoutAuth";
import AuthForm from "../../compontens/AuthForm/AuthForm";
import MessagePopup from "../../compontens/MessagePopup/MessagePopup";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { resetPassword } from "../../api/resetPassword";
import { NUMBER_REG_EXP } from "../../utils/constants";

import style from "../../styles/Auth.module.scss";

export default function ResetPassword() {
  const router = useRouter();
  const { t } = useTranslation('auth');
  const { handleChange, values, isValid, errors, setIsValid } =
    useFormAndValidation();
  const searchParams = useSearchParams();

  const [errorPasswordRepeat, setErrorPasswordRepeat] = useState("");
  const [isErrorMessaggeOpen, setIsErrorMessageOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorOnlyNumbers, setErrorOnlyNumbers] = useState("");
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();

    setIsActiveButton(false);
    setIsSuccess(true);
    setErrorMessage(t("error-pending-reset"));
    setIsErrorMessageOpen(true);

    const token = searchParams.get("token");
    const res = await resetPassword(token, values.password);

    if (res) {
      router.push("/login");
    } else {
      setIsSuccess(false);
      setErrorMessage(t("error"));
      setIsErrorMessageOpen(true);
      setIsActiveButton(true);
    }
  };

  useEffect(() => {
    isValid ? setIsActiveButton(true) : setIsActiveButton(false);
  }, [isValid]);

  useEffect(() => {
    if (values.password !== values.repeatPassword) {
      setIsValid(false);
      setErrorPasswordRepeat(t("error-passwords-not-match"));
    } else if (
      !errors.password &&
      !errors.repeatPassword &&
      errorPasswordRepeat &&
      !errorOnlyNumbers
    ) {
      setIsValid(true);
      setErrorPasswordRepeat("");
    } else {
      setErrorPasswordRepeat("");
    }

    if (values.password && NUMBER_REG_EXP.test(values.password)) {
      setIsValid(false);
      setErrorOnlyNumbers(t("error-numbers"));
    } else if (
      !errors.password &&
      !errors.repeatPassword &&
      !errorPasswordRepeat &&
      errorOnlyNumbers
    ) {
      setIsValid(true);
      setErrorOnlyNumbers("");
    } else {
      setErrorOnlyNumbers("");
    }
  }, [values.password, values.repeatPassword]);

  return (
    <LayoutAuth>
      <AuthForm
        title={t("change-password-title")}
        button={t("change-password-button")}
        handleSubmitForm={handleSubmitForm}
        isActiveButton={isActiveButton}
      >
        <label className={style["input"]} htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            required
            className={style["input__field"]}
            placeholder={t("change-password")}
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
