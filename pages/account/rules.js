import { useTranslation } from 'next-i18next';

import LayoutAccount from '../../compontens/LayoutAccount/LayoutAccount';

import style from '../../styles/Rules.module.scss';

Rules.getLayout = function getLayout(page) {
  return (
    <LayoutAccount>
      {page}
    </LayoutAccount>
  );
}

export default function Rules() {
  const { t } = useTranslation();

  return (
    <>
      <section className='section-account'>
        <h3 className='section-account-title'>
          {t('rules')}
        </h3>
        <div className={style['rules']}>
          <p className={style['rules__title']}>
            {t('rules')}
          </p>
          <div className={style['rules__list-wrap']}>
            <ul className={style['rules__list']}>
              <li>{t('rules-one')}</li>
              <li>{t('rules-two')}</li>
              <li>{t('rules-three')}</li>
              <li>{t('rules-four')}</li>
              <li>{t('rules-five')}</li>
              <li className={style['rules__list-cite']}>
              &mdash;&nbsp;{t('rules-admin')}&nbsp;&mdash;&nbsp;
                <cite title="Source Title">PSB-HOSTING.PRO</cite>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}