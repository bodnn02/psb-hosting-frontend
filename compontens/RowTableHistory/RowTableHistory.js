import { useEffect, useState } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";

import style from "../../styles/Balance.module.scss";

const RowTableHistory = ({ id, type, date, sum, status }) => {
  const windowWidth = useWindowWidth();
  const classStatus = `${style["section__table"]} ${
    status === "Оплачено"
      ? style["section__table_paid"]
      : status === "Paid for"
      ? style["section__table_paid"]
      : status === "Успешно"
      ? style["section__table_success"]
      : status === "Success"
      ? style["section__table_success"]
      : style["section__table_unsuccess"]
  }`;
  const classSum = `${
    type.includes("Пополнение")
      ? style["section__table-sum_plus"]
      : style["section__table-sum_minus"]
  }`;

  const [amount, setAmount] = useState("");

  useEffect(() => {
    type.includes("Пополнение") ? setAmount(`+${sum}`) : setAmount(`-${sum}`);
  }, []);

  return windowWidth < 900 ? (
    <div className={style["section__MobileGrid"]}>
      <div className={style["section__container"]}>
        <p className={classStatus}>{status}</p>
        <div className={style["section__infoOrder"]}>
          <p className={style["section__infoOrder-type"]}>{type}</p>
          <p className={style["section__infoOrder-id"]}>{`ID: ${id}`}</p>
        </div>
      </div>
      <p className={classSum}>{`${amount}$`}</p>
    </div>
  ) : (
    <tr className={style["section__tableGrid"]}>
      <td>{id}</td>
      <td>{type}</td>
      <td>{date}</td>
      <td className={classSum}>{`${amount}$`}</td>
      <td>
        <span className={classStatus}>{status}</span>
      </td>
    </tr>
  );
};

export default RowTableHistory;
