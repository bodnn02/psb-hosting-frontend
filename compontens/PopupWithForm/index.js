import style from "./PopupWithForm.module.scss";
import { useSwipeable } from "react-swipeable";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  buttonText,
  onSubmit,
  disabled,
  styleButton,
}) {
  const windowWidth = useWindowWidth();
  const changePasswordStyle = `${style.popup__button} ${style.popup__button_changePassword}`;

  const swipeHandlers = useSwipeable({
    onSwipedDown:
      styleButton === changePasswordStyle && windowWidth < 680 ? onClose : null,
  });

  return (
    <div
      className={`${style[`popup__${name}`]} ${style.popup} ${
        isOpen ? style.popup__visible : ""
      }`}
    >
      <div className={style.popup__container} {...swipeHandlers}>
        {styleButton === changePasswordStyle && windowWidth < 680 ? (
          <button className={style.popup__closeButtonMobile}></button>
        ) : (
          <button
            id="closeButton"
            type="button"
            aria-label="close"
            onClick={onClose}
            className={style.popup__closeButton}
          ></button>
        )}
        <h2 className={style.popup__name}>{title}</h2>
        <form
          name={`${name}`}
          className={style.popup__form}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            aria-label="saveButton"
            className={styleButton} /*popup__button_invalid"*/
            disabled={disabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
