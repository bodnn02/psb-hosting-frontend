import PopupWithForm from "../PopupWithForm";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { CYRILLIC_REG_EXP } from "../../utils/constants";
import style from "../PopupWithForm/PopupWithForm.module.scss";

export default function PopupChangeName({
  isOpen,
  onClose,
  onUpdateName,
  buttonText,
}) {
  const { t } = useTranslation();
  const [errorCyrillicName, setErrorCyrilycName] = useState("");
  const { values, handleChange, errors, isValid, setValues, setIsValid } =
    useFormAndValidation();
  const user = useAppSelector((store) => store.user.user);

  /*const fetchData = async (token) => {
    const data = await getUser(token);
    if (data) dispatch(fetchUser(data));
  };*/

  /*const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    setIsActiveButton(false);
    setIsSuccess(true);
    setMessage(t("error-pending-password"));
    //setIsMessaggePopupOpen(true);

    const token = localStorage.getItem("token");

    console.log("user.email", user.email);
    if (token && values.name !== user.username) {
      const queries = `username=${values.name}&email=${user.email}`;
      const res = await changeProfileData(token, queries);
      console.log("queries", queries);

      if (res) {
        console.log("res", res);
        setMessage(t("error-saved"));
        //setIsSuccess(true);
        //setIsMessaggePopupOpen(true);
        //setIsActiveButton(true);
        if (values.name !== user.username) dispatch(changeName(values.name));
        if (user.email === user.email) {
          dispatch(changeEmail(values.email));
          typeof window !== "undefined" &&
            localStorage.setItem("username", values.email.toLowerCase());
        }
      } else {
        //setMessage(t("error"));
        //setIsSuccess(false);
        //setIsMessaggePopupOpen(true);
        //setIsActiveButton(true);
      }
    } else {
      //setMessage(t("error-change-profile"));
      // setIsMessaggePopupOpen(true);
      //setIsSuccess(false);
      //setIsActiveButton(true);
    }
  };*/

  useEffect(() => {
    if (user) setValues({ ...values, name: user.username });
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateName(values.name);
  }

  useEffect(() => {
    if (values.name && values.name.match(CYRILLIC_REG_EXP)) {
      setIsValid(false);
      setErrorCyrilycName(t("error-name"));
    } else if (!errors.name && errorCyrillicName) {
      setIsValid(true);
      setErrorCyrilycName("");
    } else {
      setErrorCyrilycName("");
    }
  }, [values.name]);

  return (
    <PopupWithForm
      name={"changeName"}
      title={t("profile-name")}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      disabled={!isValid}
      styleButton={`${style.popup__button} ${style.popup__button_changeName}`}
    >
      <div
        className={`${style.popup__formName} ${style.popup__formName_nameAndEmail}`}
      >
        <p>{t("popup-input-title-changeName")}</p>
        <input
          className={`${style.popup__input} ${style.popup__input_text_name}`}
          placeholder="Новое имя пользователя"
          name="name"
          id="name"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
        <span
          className={`${style.popup__error} ${
            !isValid ? style.popup__error_active : ""
          }`}
        >
          {errorCyrillicName ? errorCyrillicName : !isValid && errors.name}
        </span>
      </div>
    </PopupWithForm>
  );
}
