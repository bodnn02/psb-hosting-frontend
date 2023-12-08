import React, { useState, useRef, useEffect } from "react";
import style from "./SystemList.module.css";
import { useTranslation } from 'next-i18next';

const SystemList = ({ systems, selectedSystem: propSelectedSystem = null, onSelect, onSelectVersion, selectedVersion: propSelectedVersion = {} }) => {
  const { t } = useTranslation();

  const [selectedSystem, setSelectedSystem] = useState(propSelectedSystem);
  const [selectedVersion, setSelectedVersion] = useState(propSelectedVersion);

  const [isOpen, setIsOpen] = useState({});
  const systemIcons = {
    ubuntu: "/ubuntu.svg",
    windows: "/windows.svg",
    debian: "/debian.svg",
    centos: "/centos.svg",
    freebsd: "/freebsd.svg",
    vzlinux: "/vzlinux.svg",
    rocky: "/rocky.png",
    astra: "/astra.png",
    alma: "/alma.svg",
    oracle: "/oracle.png",
  };

  const toggleSelect = (systemId) => {
    setIsOpen((prev) => ({ ...prev, [systemId]: !prev[systemId] }));
  };

  const nodeRefs = useRef({});

  useEffect(() => {
    setSelectedSystem(propSelectedSystem);
  }, [propSelectedSystem]);

  const handleSystemClick = (system) => {
    setSelectedSystem(system);
  
    // Если ранее не была выбрана версия для этой системы, выбираем первую версию в списке
    const isFirstVersionSelected = selectedVersion && selectedVersion[system.id] !== undefined && selectedVersion[system.id] !== null;
    if (!isFirstVersionSelected && system.versions.length > 0) {
      const firstVersion = system.versions[0].version;
      setSelectedVersion((prev) => ({ ...prev, [system.id]: firstVersion }));
      if (onSelectVersion && typeof onSelectVersion === "function") {
        onSelectVersion(firstVersion, system.id);
      }
    }
  
    if (onSelect && typeof onSelect === "function") {
      onSelect(system, selectedVersion && selectedVersion[system.id]);
    }
  };
  


  const handleVersionClick = (version, systemId) => {
    setSelectedVersion((prev) => ({ ...prev, [systemId]: version }));

    if (onSelectVersion && typeof onSelectVersion === "function") {
      onSelectVersion(version, systemId);
    }

    setIsOpen((prev) => ({ ...prev, [systemId]: false }));
  };

  var productSystems = systems.reduce((acc, os) => {
    const osName = os.name.split(/[-\s]/)[0].toLowerCase();
    const existingOS = acc.find(item => item.name === osName);

    if (existingOS) {
      existingOS.versions.push({
        id: os.id,
        version: os.name.split(/[-\s]/).slice(1).join(' '),
        content: os.content
      });
      // Sort the versions array based on the version property
      existingOS.versions.sort((a, b) => a.version.localeCompare(b.version));
    } else {
      acc.push({
        id: os.id,
        name: osName,
        versions: [{
          id: os.id,
          version: os.name.split(/[-\s]/).slice(1).join(' '),
          content: os.content
        }],
      });
    }

    return acc;
  }, []);


  const handleClickOutside = (event) => {
    for (const systemId in nodeRefs.current) {
      if (
        selectedVersion &&
        selectedVersion[systemId] &&
        selectedSystem &&
        selectedSystem.id === systemId &&
        isOpen[systemId] &&
        nodeRefs.current[systemId] &&
        !nodeRefs.current[systemId].contains(event.target)
      ) {
        setIsOpen((prev) => ({ ...prev, [systemId]: false }));
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedVersion, selectedSystem, isOpen]);

  return (
    <div className={style["system-container"]}>
      <ul className={style["system-list"]}>
        {productSystems.map((system) => (
          <li
            key={system.id}
            className={`${style["system-list__item"]} ${selectedSystem && selectedSystem.id === system.id ? style["selected"] : ""}`}
            onClick={() => handleSystemClick(system)}
          >
            <img className={style["system-list__icon"]} src={systemIcons[system.name]} alt={system.name} />
            <div>
              <h3 className={style["system-list__h3"]}>{system.name}</h3>
              {system.versions.length > 0 && (
                <div className={style["select-version"]} ref={(el) => (nodeRefs.current[system.id] = el)}>
                  <div className={style["select-version__header"]} onClick={() => toggleSelect(system.id)}>
                    <div className={style["select-version__title"]}>
                      {(selectedVersion && selectedVersion[system.id] !== undefined && selectedVersion[system.id] !== null) ? selectedVersion[system.id] : t('new-service-system-version')}
                    </div>
                    <div className={style["select-version__arrow"]}></div>
                  </div>
                  {isOpen[system.id] && (
                    <div className={style["select-version__content"]}>
                      <div className={style["select-version__list"]}>
                        {system.versions.map((versionObject, index) => (
                          <div
                            key={index}
                            className={`${style["select-version__item"]} ${selectedVersion && selectedVersion[system.id] === versionObject.version ? style["selected"] : ""}`}
                            onClick={() => handleVersionClick(versionObject.version, system.id)}
                          >
                            {typeof versionObject.version === "number"
                              ? versionObject.version.toFixed(2)
                              : versionObject.version}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SystemList;
