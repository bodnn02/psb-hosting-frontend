import { useState, useRef } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import "iconify-icon";

import style from "./FaqItem.module.scss";

const FaqItem = ({ question, answer }) => {
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation("landing");
  const faqRef = useRef(null);

  const handleClickQuestion = () => {
    if (isActive) {
      setIsActive(false);
      faqRef.current.style.maxHeight = null;
      faqRef.current.style.marginTop = null;
    } else {
      setIsActive(true);
      faqRef.current.style.maxHeight = faqRef.current.scrollHeight + "px";
      faqRef.current.style.marginTop = "24px";
    }
  };

  return (
    <li className={`${style["faq__item"]}`} onClick={handleClickQuestion}>
      <div className={style["faq__question"]}>
        <p className={style["faq__title"]}>{question}</p>
        <button
          type="button"
          aria-label="кнопка показать ответ"
          className={`${style["faq__button"]} ${
            isActive ? style["faq__button_open"] : ""
          }`}
        ></button>
      </div>
      {typeof answer !== "string" && answer.length === 3 && (
        <>
          <p className={`${style["faq__answer"]}`} ref={faqRef}>
            <span>{answer[0]}</span>
            <span>
              {answer[1]}
              <Link
                className={style["faq__link"]}
                href="https://www.wireguard.com/install/"
                target="_blank"
              >
                Wireguard
              </Link>
              ,&nbsp;
            </span>
            <span>{answer[2]}</span>
          </p>
          <ul className={`${style["faq__answer"]}`} ref={faqRef}>
            <li>{answer[0]}</li>
            <li>
              {answer[1]}
              <Link
                className={style["faq__link"]}
                href="https://www.wireguard.com/install/"
                target="_blank"
              >
                Wireguard
              </Link>
              <span>,&nbsp;</span>
            </li>
            <li>{answer[2]}</li>
          </ul>
        </>
      )}
      {typeof answer !== "string" && answer.length === 4 && (
        <p className={`${style["faq__answer"]}`} ref={faqRef}>
          {answer.map((el, ind) => {
            return (
              <span className={style["faq__span"]} key={ind}>
                {el}
              </span>
            );
          })}
        </p>
      )}
      {typeof answer === "string" && answer.includes("https") && (
        <p className={`${style["faq__answer"]}`} ref={faqRef}>
          {`${t("faq-link")}`}
          <span> </span>
          <Link className={style["faq__link"]} href={answer} target="_blank">
            {answer}
          </Link>
        </p>
      )}
      {typeof answer === "string" && !answer.includes("https") && (
        <p className={`${style["faq__answer"]}`} ref={faqRef}>
          {answer}
        </p>
      )}
    </li>
  );
};

export default FaqItem;
