import PopupWithForm from "../PopupWithForm";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { NUMBER_REG_EXP } from "../../utils/constants";
import style from "../PopupWithForm/PopupWithForm.module.scss";

export default function PopupChangePassword({
  isOpen,
  onClose,
  onUpdatePassword,
  buttonText,
}) {
  const { t } = useTranslation();
  const [errorPasswordRepeat, setErrorPasswordRepeat] = useState("");
  const [errorPasswordEquals, setErrorPasswordEquals] = useState("");
  const [errorOnlyNumbers, setErrorOnlyNumbers] = useState("");
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    setIsValid,
    resetForm,
  } = useFormAndValidation();
  const user = useAppSelector((store) => store.user.user);

  useEffect(() => {
    if (user) setValues({ ...values, name: user.username, email: user.email });
  }, [user]);

  useEffect(() => {
    if (
      values.oldPassword === values.newPassword &&
      values.oldPassword !== "" &&
      values.oldPassword !== undefined
    ) {
      setIsValid(false);
      setErrorPasswordRepeat(t("error-password-use"));
    } else if (
      !errors.oldPassword &&
      !errorPasswordEquals &&
      errorPasswordRepeat &&
      !errorOnlyNumbers &&
      !errors.newPassword &&
      !errors.confirmPassword
    ) {
      setIsValid(true);
      setErrorPasswordRepeat("");
    } else {
      setErrorPasswordRepeat("");
    }

    if (values.confirmPassword !== values.newPassword) {
      setIsValid(false);
      setErrorPasswordEquals(t("error-passwords-not-match"));
    } else if (
      !errors.oldPassword &&
      !errors.newPassword &&
      !errors.confirmPassword &&
      errorPasswordEquals &&
      !errorPasswordRepeat &&
      !errorOnlyNumbers
    ) {
      setIsValid(true);
      setErrorPasswordEquals("");
    } else {
      setErrorPasswordEquals("");
    }

    if (values.newPassword && NUMBER_REG_EXP.test(values.newPassword)) {
      setIsValid(false);
      setErrorOnlyNumbers(t("error-numbers"));
    } else if (
      !errors.oldPassword &&
      !errorPasswordEquals &&
      !errorPasswordRepeat &&
      errorOnlyNumbers &&
      !errors.newPassword &&
      !errors.confirmPassword
    ) {
      setIsValid(true);
      setErrorOnlyNumbers("");
    } else {
      setErrorOnlyNumbers("");
    }
  }, [values.confirmPassword, values.newPassword, values.oldPassword]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdatePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    resetForm();
  }

  return (
    <PopupWithForm
      name={"changePassword"}
      title={t("popup-name-password")}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      disabled={!isValid}
      styleButton={`${style.popup__button} ${style.popup__button_changePassword}`}
    >
      <div className={style.popup__formName}>
        <p>{t("profile-password-old")}</p>
        <input
          className={`${style.popup__input} ${style.popup__input_text_name}`}
          placeholder={t("popup-placeholder-oldpassword")}
          type="text"
          name="oldPassword"
          id="oldPassword"
          required
          value={values.oldPassword || ""}
          onChange={handleChange}
          minLength="8"
        />
        <span
          className={`${style.popup__error} ${
            !isValid ? style.popup__error_active : ""
          }`}
        >
          {!isValid && errors.oldPassword}
        </span>
        <div className={style.popup__text}>
          <p>{t("profile-password-rule-two")}</p>
          <p>{t("profile-password-rule-four")}</p>
        </div>
        <p>{t("profile-password-new")}</p>
        <input
          className={`${style.popup__input} ${style.popup__input_text_name}`}
          placeholder={t("profile-password-new")}
          type="text"
          name="newPassword"
          id="newPassword"
          required
          value={values.newPassword || ""}
          onChange={handleChange}
          minLength="8"
        />
        <span
          className={`${style.popup__error} ${
            !isValid ? style.popup__error_active : ""
          }`}
        >
          {errorPasswordRepeat
            ? errorPasswordRepeat
            : errorOnlyNumbers
            ? errorOnlyNumbers
            : !isValid
            ? errors.newPassword
            : ""}
        </span>

        <p>{t("profile-password-new-repeat")}</p>
        <input
          className={`${style.popup__input} ${style.popup__input_text_name}`}
          placeholder={t("popup-placeholder-confirm")}
          type="text"
          name="confirmPassword"
          id="confirmPassword"
          required
          value={values.confirmPassword || ""}
          onChange={handleChange}
          minLength="8"
        />
        <span
          className={`${style.popup__error} ${
            !isValid ? style.popup__error_active : ""
          }`}
        >
          {errorPasswordEquals
            ? errorPasswordEquals
            : !isValid
            ? errors.confirmPassword
            : ""}
        </span>
      </div>
    </PopupWithForm>
  );
}
