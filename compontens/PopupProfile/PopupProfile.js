import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import 'iconify-icon';

import { INDENT_POPUP_PROFILE } from '../../utils/constants';
import useWindowWidth from '../../hooks/useWindowWidth';

import style from './PopupProfile.module.scss';

const PopupProfile = ({ isOpen, right, setIsOpenPopupProfile }) => {
  const popup = useRef();
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();

  const closePopup = () => {
    setIsOpenPopupProfile(false);
  }

  const handleClickOutside = (evt) => {
    if (popup.current && !popup.current.contains(evt.target)) {
      closePopup();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', closePopup);

    return () => {
      window.removeEventListener('scroll', closePopup);
    };
  }, []);

  useEffect(() => {
    if (right !== 0) {
      const x = windowWidth - right - INDENT_POPUP_PROFILE;
      popup.current.style.right = `${x}px`;
    }
  }, [right, windowWidth]);

  return (
    <section className={`${style['popup']} ${isOpen ? style['popup_opened'] : ''}`}>
      <div className={style['popup__container']} ref={popup}>
        <div
          className={style['popup__profile-heading']}
          onClick={closePopup}
        ></div>
        <ul>
          <li>
          <Link className={style['popup__profile-link']} href='/account/profile' onClick={closePopup}>
            <iconify-icon icon="mingcute:user-1-line"></iconify-icon>
            {t('popup-profile-info')}
          </Link>
          </li>
          {/* <li>
            <Link className={style['popup__profile-link']} href='/account/profile/change-password' onClick={closePopup}>
              <iconify-icon icon="fa:cogs"></iconify-icon>
              {t('popup-profile-password')}
            </Link>
          </li> */}
          <li>
            <Link className={style['popup__profile-link']} href='/logout' onClick={closePopup}>
              <iconify-icon icon="mdi:alert-circle-outline"></iconify-icon>
              {t('popup-profile-logout')}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default PopupProfile;