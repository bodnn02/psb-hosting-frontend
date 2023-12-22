
import PopupWithForm from "../PopupWithForm"
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import CardSystem from "./cardSystem";
import { systemsData } from "./cardSystem/constants";
import style from "../PopupWithForm/PopupWithForm.module.scss";
import SystemList from "../SystemList/SystemList";

export default function PopupChangeSystem({
  isOpen,
  onClose,
  onUpdateSystem,
  buttonText,
  disabled,
}) {
  const { t } = useTranslation();

  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState({});
  const currentOrder = useAppSelector(
    (store) => store.currentOrder.currentOrder
  );

  function handleSubmit(e) {
    e.preventDefault();
  
    const selectedVersionData = selectedSystem.versions.find((item) => item.version === selectedVersion[selectedSystem.id]);
  
    if(selectedVersionData.name) {
      onUpdateSystem(selectedVersionData.name);
    }
  }

  const handleSystemSelect = (system) => {
    setSelectedSystem(system);
  };

  const handleVersionSelect = (version, systemId) => {
    setSelectedVersion((prev) => ({ ...prev, [systemId]: version }));
  };
  

  return (
    <PopupWithForm
      name={"changeSystem"}
      title={t("card-system")}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      disabled={disabled}
      styleButton={`${style.popup__button} ${style.popup__button_changeSystem}`}
    >
      <div className={style.popup__formSystems}>
        <SystemList
          systems={currentOrder.system}
          onSelect={handleSystemSelect}
          onSelectVersion={handleVersionSelect}
          selectedSystem={selectedSystem}
          selectedVersion={selectedVersion}
        />
      </div>
    </PopupWithForm>
  );
}
