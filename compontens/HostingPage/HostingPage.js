import { useTranslation } from 'next-i18next';

import { useAppSelector } from '../../store/hooks';
import HostingCard from '../HostingCard/HostingCard';

import style from './HostingPage.module.scss';

export const HostingPage = () => {
  const { t } = useTranslation("landing");
  const hosting = useAppSelector(store => store.hosting.hosting);

  return (
    <section className={style.page}>
      <ul className={style.about}>
        <li className={style.aboutItem}>
          {t('hosting-about-one')}
        </li>
        <li className={style.aboutItem}>
          {t('hosting-about-two')}
        </li>
      </ul>
      <ul className={style.list}>
        {hosting && hosting.map(el => {
          return (
            <HostingCard
              key={el.id}
              hostingItem={el}
              className={style.tableItem}
            />
          );
        })}
      </ul>
    </section>
  );
}