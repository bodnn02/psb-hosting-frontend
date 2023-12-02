import { useState, useEffect } from "react";
import style from "./ConfigTable.module.css";

const ConfigTable = ({ configs, SelectedConfig: propSelectedConfig = null, onSelect }) => {
    const [visibleConfigs, setVisibleConfigs] = useState(4);
    const [selectedConfig, setSelectedConfig] = useState(propSelectedConfig);

    // Обновление выбранной конфигурации и вызов функции onSelect
    const updateSelectedConfig = (index) => {
        setSelectedConfig(index);
        if (onSelect) {
            onSelect(configs[index]);
        }
    };

    // Обработка клика по конфигурации
    const handleConfigClick = (index) => {
        updateSelectedConfig(index);
    };

    // Обработка изменений в propSelectedConfig
    useEffect(() => {
        setSelectedConfig(propSelectedConfig);
    }, [propSelectedConfig]);

    const handleLoadMoreClick = () => {
        // Обработчик клика "Показать еще"
        setVisibleConfigs((prevVisibleConfigs) => prevVisibleConfigs + 3);
    };

    // Получение уникальных имен
    const uniqueNames = [...new Set(configs.flatMap(config => config.map(item => item.name)))];

    return (
        <>
            <table className={style["config-table"]}>
                <thead>
                    <tr className={style["config-table__row"]}>
                        {uniqueNames.map((name, index) => (
                            <th key={index} className={style["config-table__th"]}>
                                {name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {configs.slice(0, visibleConfigs).map((config, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`${style["config-table__row"]} ${selectedConfig === rowIndex ? style["selected"] : ""
                                }`}
                            onClick={() => handleConfigClick(rowIndex)}
                        >
                            {uniqueNames.map((name, colIndex) => {
                                const item = config.find(item => item.name === name);
                                return (
                                    <td key={colIndex} className={style["config-table__td"]}>
                                        {item ? item.value : ""}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {visibleConfigs < configs.length && (
                <div className={style["config-table__load-more"]} onClick={handleLoadMoreClick}>
                    Показать еще {Math.min(3, configs.length - visibleConfigs)}
                </div>
            )}
        </>
    );
};

export default ConfigTable;
