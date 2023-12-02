import PopupWithForm from "../PopupWithForm"
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import style from "../PopupWithForm/PopupWithForm.module.scss";
import ConfigTable from "../ConfigTable/ConfigTable";
import { useAppSelector } from "../../store/hooks";

export default function PopupChangeSystem({
  isOpen,
  handleClosePopup,
  /*onUpdateConfig,*/
  buttonText,
  disabled,
  products
}) {
  const { t } = useTranslation();

  const [selectedConfig, setSelectedConfig] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    /*onUpdateConfig(isSelectedSystem);*/
  }

  function handleClose() {
    handleClosePopup();
  }

  const handleConfigSelect = (config) => {
    setSelectedConfig(config);
  };
  var filteredConfigs = products.map((product) => {
    const configOrder = ['vCPU', 'RAM', 'SSD'];

    const sortedCharacters = configOrder.map((paramName) => {
      // Check if product.characters is defined and not null
      const character = product.characters && product.characters.find((char) => char && char.name === paramName);

      return {
        id: character ? character.id : null,
        name: character ? character.name : null,
        value: character ? character.content : null,
      };
    });

    // Проверяем, есть ли хотя бы один параметр в продукте
    const hasParameters = sortedCharacters.some((param) => param.value !== null);

    // Добавляем объект "Price" только если есть хотя бы один параметр
    if (hasParameters) {
      const totalPrice = product.price + ' $/Month';
      sortedCharacters.push({
        name: 'Price',
        value: totalPrice,
      });
    }
    sortedCharacters.push({
      product_id: product.id,
    });
    return sortedCharacters;
  });
  return (
    <PopupWithForm
      name={"changeCongig"}
      title={t("profile-order-configuration")}
      isOpen={isOpen}
      onClose={handleClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      disabled={disabled}
      styleButton={`${style.popup__button} ${style.popup__button_changeConfig}`}
    >
      <div className={style.popup__formConfig}>
        <ConfigTable
          configs={filteredConfigs} SelectedConfig={selectedConfig} onSelect={handleConfigSelect}
        />
      </div>
    </PopupWithForm>
  );
}
