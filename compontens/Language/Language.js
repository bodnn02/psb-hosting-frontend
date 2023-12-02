import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import style from './Language.module.scss';

const Language = ({ isMobileMenuOpen, setIsLoading }) => {
  const [language, setLanguage] = useState({ lang: 'Русский', img: '/ru.svg' });
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const { i18n } = useTranslation();
  const router = useRouter();
  const { pathname, asPatch, query, locale } = router;

  const listClass = `${style['language__list']}
    ${isLanguageMenuOpen ? style['language__list_visible'] : ''}
    ${language.lang === 'English' ? style['language__list_reverse'] : ''}
    ${isMobileMenuOpen && language.lang === 'Русский' ? style['language__list_mobile'] : ''}
    ${isMobileMenuOpen && language.lang === 'English' ? style['language__list_mobile-reverse'] : ''}`;
  const wrapClass = `${style['language-wrapper']} ${isMobileMenuOpen ? style['language-wrapper_mobile'] : ''}`;
  const caretClass = `${style['language-caret']} ${isLanguageMenuOpen ? style['language-caret_open'] : ''}
    ${isMobileMenuOpen && !isLanguageMenuOpen ? style['language-caret_mobile'] : ''}
    ${isMobileMenuOpen && isLanguageMenuOpen ? style['language-caret_mobile-open'] : ''}`;

  const openLanguageMenu = () => {
    isLanguageMenuOpen ? setIsLanguageMenuOpen(false) : setIsLanguageMenuOpen(true);
  }

  const changeLanguage = (evt) => {
    const el = evt.currentTarget;

    setIsLoading(true);

    if (el.id === locale) {
      setIsLanguageMenuOpen(false);
      setIsLoading(false);
    } else {
      if (el.id === 'ru') {
        setLanguage({ lang: 'Русский', img: '/ru.svg' });
      } else if (el.id === 'en') {
        setLanguage({ lang: 'English', img: '/us.svg' });
      }

      window.localStorage.setItem('MY_LANGUAGE', el.id);
      setIsLanguageMenuOpen(false);
      i18n.changeLanguage(el.id);
      router.push({ pathname, query }, asPatch, { locale: el.id });
    }
  }

  useEffect(() => {
    if (locale === 'en') {
      setLanguage({ lang: 'English', img: '/us.svg' });
    } else {
      setLanguage({ lang: 'Русский', img: '/ru.svg' });
    }
  }, [locale]);

  return (
    <div className={wrapClass}>
      <p className={style['language__input']} onClick={openLanguageMenu}>
        <img src={language.img} alt="country" />
        <span>{language.lang}</span>
      </p>
      <ul className={listClass}>
        <li className={style['language__input']} id='ru' onClick={changeLanguage}>
          <img src='/ru.svg' alt="country" />
          <span>Русский</span>
        </li>
        <li className={style['language__input']} id='en' onClick={changeLanguage}>
          <img src='/us.svg' alt="country" />
          <span>English</span>
        </li>
      </ul>
      <button
        src="/caret.svg"
        alt="caret"
        className={caretClass}
        aria-label='button open list languages'
        onClick={openLanguageMenu}
      ></button>
    </div>
  );
}

export default Language;