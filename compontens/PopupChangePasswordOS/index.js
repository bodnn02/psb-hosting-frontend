import PopupWithForm from "../PopupWithForm";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { NUMBER_REG_EXP } from "../../utils/constants";
import style from "../PopupWithForm/PopupWithForm.module.scss";

export default function PopupChangePasswordOS({
  isOpen,
  onClose,
  onUpdatePassword,
  buttonText,
}) {
  const { t } = useTranslation();
  const [errorOnlyNumbers, setErrorOnlyNumbers] = useState("");
  const {
    values,
    handleChange,
    errors,
    isValid,
    /*setValues,*/
    setIsValid,
    resetForm,
  } = useFormAndValidation();
  const user = useAppSelector((store) => store.user.user);

  /*useEffect(() => {
    if (user) setValues({ ...values, name: user.username, email: user.email });
  }, [user]);*/

  useEffect(() => {
    if (values.newPassword && NUMBER_REG_EXP.test(values.newPassword)) {
      setIsValid(false);
      setErrorOnlyNumbers(t("error-numbers"));
    } else if (!errors.password && errorOnlyNumbers) {
      setIsValid(true);
      setErrorOnlyNumbers("");
    } else {
      setErrorOnlyNumbers("");
    }
  }, [values.newPassword]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdatePassword(values.newPassword);
    resetForm();
  }

  return (
    <PopupWithForm
      name={"changePasswordOS"}
      title={"Пароль"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      disabled={!isValid}
      styleButton={`${style.popup__button} ${style.popup__button_changePassword}`}
    >
      <div className={style.popup__formName}>
        <p>{t("profile-password-new")}</p>
        <input
          className={`${style.popup__input} ${style.popup__input_text_name}`}
          placeholder="Новый пароль"
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
          {!isValid && errors.newPassword}
        </span>
      </div>
    </PopupWithForm>
  );
}
