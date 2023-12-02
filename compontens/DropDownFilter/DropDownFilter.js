import { useState, useEffect, useRef } from 'react';

import style from '../../styles/AccountShop.module.scss';

export const DropDownFilter = ({ list, setOption, name, setName }) => {
  const [selectOpen, setSelectOpen] = useState(false);

  const dropdownListRef = useRef();

  const handleSelectClick = () => {
    selectOpen ? setSelectOpen(false) : setSelectOpen(true);
  }

  const handleOptionClick = (evt) => {
    setOption(evt.currentTarget.textContent);
    setSelectOpen(false);
    setName(evt.currentTarget.textContent);
  }

  const handleClickOutside = (evt) => {
    if (dropdownListRef.current && !dropdownListRef.current.contains(evt.target)) {
      setSelectOpen(false);
    }
  }

  useEffect(() => {
    setName('Select');
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className={style['shop__select-wrap']} ref={dropdownListRef}>
      <div
        className={`${style['shop__form-select']} ${selectOpen ? style['shop__form-select_open'] : ''}`}
        onClick={handleSelectClick}
      >
        {name}
      </div>
      <ul className={`${style['shop__option-list']} ${selectOpen ? style['shop__option-list_open'] : ''}`}>
        <li onClick={handleOptionClick}>Select</li>
        {list.map((el, ind) => {
          return (
            <li key={ind} onClick={handleOptionClick}>
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
}