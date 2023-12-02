import { useTranslation } from 'next-i18next';

import style from './AvailableSystems.module.scss'

const AvailableSystems = () => {
  const { t } = useTranslation("landing");

  return (
    <section className={style['systems']}>
        <h2 className={`${['h2-title']} ${style['systems-title']}`}>
          {t('systems')}
        </h2>
        <h2 className={`${['h2-title']} ${style['systems-title-mobile']}`}>
          {t('systems-mobile')}
        </h2>
        <ul className={style['systems__list']}>
          <li className={style['systems__item']}>
            <img className={style['systems__image']} src='/windows.svg' alt='windows' />
            <p className={style['systems__item-title']}>Windows</p>
          </li>
          <li className={style['systems__item']}>
            <img className={style['systems__image']} src='/debian.svg' alt='Debian' />
            <p className={style['systems__item-title']}>Debian</p>
          </li>
          <li className={style['systems__item']}>
            <img className={style['systems__image']} src='/centos.svg' alt='centos' />
            <p className={style['systems__item-title']}>Centos</p>
          </li>
          <li className={style['systems__item']}>
            <img className={style['systems__image']} src='/ubuntu.svg' alt='ubuntu' />
            <p className={style['systems__item-title']}>Ubuntu</p>
          </li>
          <li className={style['systems__item']}>
            <img className={style['systems__image']} src='/freebsd.svg' alt='FreeBSD' />
            <p className={style['systems__item-title']}>FreeBSD</p>
          </li>
        </ul>
      </section>
  );
}
export default AvailableSystems;