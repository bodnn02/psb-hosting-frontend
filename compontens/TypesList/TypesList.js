import { useState } from "react";
import Renewal from "../Renewal/Renewal";
import useToggleAutoRefresh from "../../hooks/useToggleAutoRefresh";
import MessagePopup from "../MessagePopup/MessagePopup";

import style from "./TypesList.module.css";

const TypesList = ({ types, selectedType: propSelectedType = null, onSelect }) => {
    const [selectedType, setSelectedType] = useState(propSelectedType);

    const handleTypeClick = (type) => {
        setSelectedType(type);
        onSelect({ type });
    };

    return (
        <ul className={style['types-list']}>
            {types.map((type, index) => (
                <li
                    key={index}
                    className={`${style['types-list__item']} ${selectedType && selectedType.id === type.id ? style['selected'] : ''}`}
                    onClick={() => handleTypeClick(type)}
                >
                    {type.icon ? <img className={style['types-list__icon']} src={type.icon} alt={type.name} /> : ''}
                    <h3 className={style['types-list__h3']}>{type.name}</h3>
                </li>
            ))}
        </ul>
    );
};

export default TypesList;
