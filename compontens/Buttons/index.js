import style from "./Profile.module.scss";
import Link from "next/link";

export function BtnWithLink({ href, title, icon, colorBtn, iconColor }) {
  return (
    <Link
      href={href}
      className={`${style["btn__options-link"]} ${style[`btn__${colorBtn}`]}`}
    >
      {title}
      <iconify-icon
        icon={icon}
        width="24"
        height="24"
        color={iconColor}
      ></iconify-icon>
    </Link>
  );
}

export function BtnWithAction({ onClick, disabled, title, icon }) {
  return (
    <button
      className={style["btn__options-button"]}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      <iconify-icon icon={icon} width="24" height="24"></iconify-icon>
    </button>
  );
}
