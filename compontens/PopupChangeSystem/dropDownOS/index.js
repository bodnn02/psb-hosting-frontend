import { useState, useRef, useEffect } from "react";

import style from "./DropDownOS.module.scss";

export const DropDownOS = ({ list, name, setOption, setName }) => {
  const [selectOpen, setSelectOpen] = useState(false);

  const dropdownListRef = useRef();

  const handleSelectClick = () => {
    selectOpen ? setSelectOpen(false) : setSelectOpen(true);
  };

  const handleOptionClick = (evt) => {
    setOption(evt.currentTarget.id);
    setName(evt.currentTarget.textContent);
    setSelectOpen(false);
  };

  const handleClickOutside = (evt) => {
    if (
      dropdownListRef.current &&
      !dropdownListRef.current.contains(evt.target)
    ) {
      setSelectOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className={style["card__select-wrap"]} ref={dropdownListRef}>
      <div
        className={`${style["card__form-select"]} ${
          selectOpen ? style["card__form-select_open"] : ""
        }`}
        onClick={handleSelectClick}
      >
        {name}
        <iconify-icon icon="iconamoon:arrow-down-2-thin"></iconify-icon>
      </div>
      <ul
        className={`${style["card__option-list"]} ${
          selectOpen ? style["card__option-list_open"] : ""
        }`}
      >
        {list.map((el) => {
          return (
            <li key={el.id} id={el.content} onClick={handleOptionClick}>
              {!el.price && el.price !== 0 && el.name}
              {(el.price || el.price === 0) && `${el.name} - ${el.price}$`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
