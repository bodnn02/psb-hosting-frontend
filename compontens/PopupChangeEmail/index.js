import PopupWithForm from "../PopupWithForm";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { CYRILLIC_REG_EXP, EMAIL_REG_EXP } from "../../utils/constants";
import style from "../PopupWithForm/PopupWithForm.module.scss";

export default function PopupChangeEmail({
  isOpen,
  onClose,
  onUpdateEmail,
  buttonText,
}) {
  const { t } = useTranslation();
  const [errorCyrillicName, setErrorCyrilycName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const { values, handleChange, errors, isValid, setValues, setIsValid } =
    useFormAndValidation();
  const user = useAppSelector((store) => store.user.user);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateEmail(values.email);
    resetForm();
  }

  useEffect(() => {
    if (user) setValues({ ...values, name: user.username, email: user.email });
  }, [user]);

  useEffect(() => {
    if (values.email && !EMAIL_REG_EXP.test(values.email)) {
      setIsValid(false);
      setErrorEmail(t("error-email"));
    } else if (
      !errors.name &&
      !errors.email &&
      !errorCyrillicName &&
      errorEmail
    ) {
      setIsValid(true);
      setErrorEmail("");
    } else {
      setErrorEmail("");
    }
  }, [values.email]);

  return (
    <PopupWithForm
      name={"changeEmail"}
      title={"E-mail"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      disabled={!isValid}
      styleButton={`${style.popup__button} ${style.popup__button_changeEmail}`}
    >
      <div
        className={`${style.popup__formName} ${style.popup__formName_nameAndEmail}`}
      >
        <p>{t("popup-input-title-changeEmail")}</p>
        <input
          className={`${style.popup__input} ${style.popup__input_text_name}`}
          placeholder="Новую почту"
          type="email"
          name="email"
          id="email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <span
          className={`${style.popup__error} ${
            !isValid ? style.popup__error_active : ""
          }`}
        >
          {errorEmail ? errorEmail : !isValid && errors.email}
        </span>
      </div>
    </PopupWithForm>
  );
}
