import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { connect } from "react-redux";

import LayoutAccount from "../../../compontens/LayoutAccount/LayoutAccount";
import MessagePopup from "../../../compontens/MessagePopup/MessagePopup";
import { useFormAndValidation } from "../../../hooks/useFormAndValidation";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getUser } from "../../../api/getUser";
import { fetchUser, changeName, changeEmail } from "../../../store/slices/user";
import { changeProfileData } from "../../../api/changeProfileData";
import { changeProfilePassword } from "../../../api/changeProfilePassword";
import ButtonIcon from "../../../compontens/ButtonIcon";
import { BtnWithLink } from "../../../compontens/Buttons";
import PopupChangeName from "../../../compontens/PopupChangeName";
import PopupChangeEmail from "../../../compontens/PopupChangeEmail";
import PopupChangePassword from "../../../compontens/PopupChangePassword";

import style from "../../../styles/Profile.module.scss";

const Profile = () => {
  const { values, resetForm, errors, isValid, setValues, setIsValid } =
    useFormAndValidation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);

  const [isMessaggePopupOpen, setIsMessaggePopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [isEditNamePopupOpen, setIsEditNamePopupOpen] = useState(false);
  const [isEditEmailPopupOpen, setIsEditEmailPopupOpen] = useState(false);
  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] =
    useState(false);

  const fetchData = async (token) => {
    const data = await getUser(token);
    if (data) dispatch(fetchUser(data));
  };

  const changeNameFormSubmit = async (dataName) => {
    setIsActiveButton(false);
    setIsSuccess(true);
    setMessage(t("error-pending-password"));
    setIsMessaggePopupOpen(true);

    const token = localStorage.getItem("token");

    if (token && dataName !== user.username) {
      const queries = `username=${dataName}&email=${user.email}`;
      const res = await changeProfileData(token, queries);

      if (res) {
        setMessage(t("error-saved"));
        setIsSuccess(true);
        setIsMessaggePopupOpen(true);
        setIsActiveButton(true);
        if (dataName !== user.username) dispatch(changeName(dataName));
        setIsEditNamePopupOpen(false);
        resetForm();
      } else {
        setMessage(t("error"));
        setIsSuccess(false);
        setIsMessaggePopupOpen(true);
        setIsActiveButton(true);
      }
    } else {
      setMessage(t("error-change-profile"));
      setIsMessaggePopupOpen(true);
      setIsSuccess(false);
      setIsActiveButton(true);
    }
  };

  const changeEmailFormSubmit = async (dataEmail) => {
    setIsActiveButton(false);
    setIsSuccess(true);
    setMessage(t("error-pending-password"));
    setIsMessaggePopupOpen(true);

    const token = localStorage.getItem("token");

    if (token && dataEmail !== user.email) {
      const queries = `username=${user.username}&email=${dataEmail}`;
      const res = await changeProfileData(token, queries);

      if (res) {
        setMessage(t("error-saved"));
        setIsSuccess(true);
        setIsMessaggePopupOpen(true);
        setIsActiveButton(true);
        if (dataEmail !== user.email) {
          dispatch(changeEmail(dataEmail));
          typeof window !== "undefined" &&
            localStorage.setItem("username", values.email.toLowerCase());
        }
        setIsEditEmailPopupOpen(false);
      } else {
        setMessage(t("error"));
        setIsSuccess(false);
        setIsMessaggePopupOpen(true);
        setIsActiveButton(true);
      }
    } else {
      setMessage(t("error-change-profile"));
      setIsMessaggePopupOpen(true);
      setIsSuccess(false);
      setIsActiveButton(true);
    }
  };

  const changePasswordFormSubmit = async (dataPassword) => {
    setIsActiveButton(false);
    setIsSuccess(true);
    setMessage(t("error-pending-password"));
    setIsMessaggePopupOpen(true);

    const token = localStorage.getItem("token");

    if (token && dataPassword.oldPassword !== dataPassword.newPassword) {
      const res = await changeProfilePassword(token, dataPassword.newPassword);

      if (res) {
        setMessage(t("error-saved"));
        setIsMessaggePopupOpen(true);
        setIsSuccess(true);
        setIsActiveButton(true);
        setIsChangePasswordPopupOpen(false);
      } else {
        setMessage(t("error"));
        setIsMessaggePopupOpen(true);
        setIsActiveButton(true);
        setIsSuccess(false);
      }
    } else {
      setMessage(t("error-change-profile"));
      setIsMessaggePopupOpen(true);
      setIsActiveButton(true);
      setIsSuccess(false);
    }
  };

  /*useEffect(() => {
    isValid ? setIsActiveButton(true) : setIsActiveButton(false);
  }, [isValid]);*/

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      fetchData(token);
    }
  }, []);

  useEffect(() => {
    if (user) setValues({ ...values, name: user.username, email: user.email });
  }, [user]);

  const handleChangeName = () => {
    setIsEditNamePopupOpen(true);
  };

  const handleChangeEmail = () => {
    setIsEditEmailPopupOpen(true);
  };

  const handleChangePassword = () => {
    setIsChangePasswordPopupOpen(true);
  };

  const closeAllPopups = (form) => {
    setIsEditNamePopupOpen(false);
    setIsEditEmailPopupOpen(false);
    setIsChangePasswordPopupOpen(false);
  };

  return (
    <section className={style["formContainer"]}>
      <div
        className={style["form"]}
      >
        <label htmlFor="name" className={style["form__label"]}>
          {t("profile-name")}
          <ul className={style["form__order-item"]}>
            <li className={style["form__details-item"]}>
              <input
                className={style["form__text-black"]}
                type={"text"}
                name="name"
                id="name"
                readOnly
                value={values.name || ""}
              />
              <ButtonIcon
                icon={"ci:edit-pencil-01"}
                handleClick={handleChangeName}
              />
            </li>
          </ul>
        </label>
        <label htmlFor="name" className={style["form__label"]}>
          {t("profile-email")}
          <ul className={style["form__order-item"]}>
            <li className={style["form__details-item"]}>
              <input
                className={style["form__text-black"]}
                type="email"
                name="email"
                id="email"
                readOnly
                value={values.email || ""}
              />
              <ButtonIcon
                icon={"ci:edit-pencil-01"}
                handleClick={handleChangeEmail}
              />
            </li>
          </ul>
        </label>
        <button
          className={style["form__options-button"]}
          type="button"
          onClick={handleChangePassword}
        >
          {t("profile-password-change")}
          <iconify-icon
            icon="mingcute:settings-3-line"
            width="24"
            height="24"
          ></iconify-icon>
        </button>
        <BtnWithLink
          href="/logout"
          title={t("popup-profile-logout")}
          icon={"ic:outline-log-out"}
          colorBtn={"options-link-blue-width"}
          iconColor={null}
        />
      </div>
      <div></div>
      <div></div>
      <MessagePopup
        isOpen={isMessaggePopupOpen}
        message={message}
        setIsOpen={setIsMessaggePopupOpen}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
      />
      <PopupChangeName
        isOpen={isEditNamePopupOpen}
        onClose={closeAllPopups}
        onUpdateName={changeNameFormSubmit}
        buttonText={t("popup-button-change-name")}
      />
      <PopupChangeEmail
        isOpen={isEditEmailPopupOpen}
        onClose={closeAllPopups}
        onUpdateEmail={changeEmailFormSubmit}
        buttonText={t("popup-button-change-email")}
      />
      <PopupChangePassword
        isOpen={isChangePasswordPopupOpen}
        onClose={closeAllPopups}
        onUpdatePassword={changePasswordFormSubmit}
        buttonText={t("profile-password-change")}
      />
    </section>
  );
};

Profile.getLayout = function getLayout(page) {
  return <LayoutAccount>{page}</LayoutAccount>;
};

export default connect((state) => state)(Profile);
