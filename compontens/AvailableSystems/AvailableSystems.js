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
          <div className={style['systems__image']}>
            <img src='/windows.svg' alt='windows' />
          </div>
          <p className={style['systems__item-title']}>Windows</p>
        </li>
        <li className={style['systems__item']}>
          <div className={style['systems__image']}>
            <img src='/debian.svg' alt='Debian' />
          </div>
          <p className={style['systems__item-title']}>Debian</p>
        </li>
        <li className={style['systems__item']}>
          <div className={style['systems__image']}>
            <img src='/centos.svg' alt='centos' />
          </div>
          <p className={style['systems__item-title']}>Centos</p>
        </li>
        <li className={style['systems__item']}>
          <div className={style['systems__image']}>
            <img src='/ubuntu.svg' alt='ubuntu' />
          </div>
          <p className={style['systems__item-title']}>Ubuntu</p>
        </li>
        <li className={style['systems__item']}>
          <div className={style['systems__image']}>
            <img src='/freebsd.svg' alt='FreeBSD' />
          </div>
          <p className={style['systems__item-title']}>FreeBSD</p>
        </li>
      </ul>
    </section>
  );
}
export default AvailableSystems;