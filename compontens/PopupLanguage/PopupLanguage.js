import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import style from './PopupLanguage.module.scss';

const PopupLanguage = ({ isOpen, closePopup }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { pathname, asPatch, query } = router;
  const popup = useRef();

  const changeLanguage = (evt) => {
    const el = evt.currentTarget;

    if (el.id === 'RU') {
      window.localStorage.setItem('MY_LANGUAGE', 'ru');
      i18n.changeLanguage('ru');
      router.push({ pathname, query }, asPatch, { locale: 'ru' });
    } else if (el.id = 'EN') {
      window.localStorage.setItem('MY_LANGUAGE', 'en');
      i18n.changeLanguage('en');
      router.push({ pathname, query }, asPatch, { locale: 'en' });
    }
    closePopup();
  }

  const handleClickOutside = (evt) => {
    if (popup.current && !popup.current.contains(evt.target)) {
      closePopup();
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', closePopup);

    return () => {
      window.removeEventListener('scroll', closePopup);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <section className={`${style['popup']} ${isOpen ? style['popup_opened'] : ''}`}>
      <div className={style['popup__container']}>
        <div className={style['popup__content']} ref={popup}>
          <div className={style['popup__header']}>
            <h6 className={style['popup__title']}>{t('lang')}</h6>
            <button
              type='bitton'
              className={style['popup__button-close']}
              onClick={closePopup}
            >x</button>
          </div>
          <ul className={style['popup__body']}>
            <li className={style['popup__item']}>
              <button
                className={`${style['popup__button-country']}
                ${style['popup__button-country_us']}`}
                id='EN'
                onClick={changeLanguage}
              >
                English
              </button>
            </li>
            <li className={style['popup__item']}>
              <button
                className={`${style['popup__button-country']}
                ${style['popup__button-country_ru']}`}
                id='RU'
                onClick={changeLanguage}
              >
                Русский
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopupLanguage;