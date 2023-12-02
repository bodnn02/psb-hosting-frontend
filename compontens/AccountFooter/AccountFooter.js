import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import 'iconify-icon';

import useWindowWidth from '../../hooks/useWindowWidth';

import style from './AccountFooter.module.scss';

const AccountFooter = ({ isSidebarMini }) => {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();

  return (
    <footer className={`${style['footer']} ${(isSidebarMini && windowWidth > 991) ? style['footer_sadebar-mini'] : ''}`}>
      <p className={style['footer__text']}>
        {`Copyright © 2022 - ${new Date().getFullYear()}`}&nbsp;
        <Link href="https://psb-offshore.pro/">PROFESSIONAL SUPPORT BUSINESS</Link>.&nbsp;
        <iconify-icon icon="mdi:cards-heart"></iconify-icon>&nbsp;
        {t('develop')}&nbsp;
        <Link href="https://t.me/AIlab73">AILAB73</Link>&nbsp;
        {t('develop-text')}
      </p>
    </footer>
  );
}

export default AccountFooter;