import style from "../../styles/Order.module.scss";

export default function ButtonIcon({ icon, handleClick }) {
  return (
    <button type="button" className={style["order__button-item"]}>
      <iconify-icon
        className={style["order__button-icon"]}
        icon={icon}
        onClick={handleClick}
      ></iconify-icon>
    </button>
  );
}
