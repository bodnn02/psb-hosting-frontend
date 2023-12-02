import { useState, useEffect } from "react";
import { VPN_COUNTRIES } from "../../utils/constants";

import style from "./CountryList.module.css";

// Компонент для отображения списка стран
const CountryList = ({ countries, selectedCountry: propSelectedCountry = null, onSelect }) => {
    const [selectedCountry, setSelectedCountry] = useState(propSelectedCountry);

    // Маппинг иконок для стран

    // Обновление выбранной страны и вызов функции onSelect
    const updateSelectedCountry = (name) => {
        setSelectedCountry(name);
        if (onSelect) {
            onSelect(name);
        }
    };

    // Обработка клика по стране
    const handleCountryClick = (name) => {
        updateSelectedCountry(name);
    };

    // Обработка изменений в propSelectedCountry
    useEffect(() => {
        setSelectedCountry(propSelectedCountry);
    }, [propSelectedCountry]);

    // Вспомогательная функция для отображения названия страны без "BEST PRICE"
    const getCountryNameWithoutBestPrice = (name) => {
        if (typeof name === 'string') {
            return name.replace(" BEST PRICE", "");
        }
        return name;
    };

    return (
        <ul className={style['countries-list']}>
            {countries.map((country, index) => {
                const flagIcon = VPN_COUNTRIES.find(item => item.country === getCountryNameWithoutBestPrice(country))?.flag;

                return (
                    <li key={index} className={`${style['countries-list__item']} ${selectedCountry === country ? style['selected'] : ''}`} onClick={() => handleCountryClick(country)}>
                        <img className={style['countries-list__icon']} src={flagIcon || ''} alt={country} />
                        <h3 className={style['countries-list__h3']}>{getCountryNameWithoutBestPrice(country)}</h3>
                        {typeof country === 'string' && country.includes("BEST PRICE") && <p className={style['countries-list__hot']}>Best Price</p>}
                    </li>
                );
            })}
        </ul>
    );
};

export default CountryList;
