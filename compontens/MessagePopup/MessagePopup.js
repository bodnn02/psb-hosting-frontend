import { useEffect } from 'react';

import style from './MessagePopup.module.scss';

export default function MessagePopup({ message, isOpen, setIsOpen, isSuccess, setIsSuccess }) {
  const classPopup = `${style.popup}
    ${isOpen ? style['popup_open'] : ''}
    ${isSuccess ? style['popup_success'] : ''}`;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
        if (isSuccess) setIsSuccess(false);
      }, 5000);
    }
  }, [isOpen]);

  return (
    <section className={classPopup}>
      <p className={style['popup__message']}>
        {message}
      </p>
    </section>
  );
}