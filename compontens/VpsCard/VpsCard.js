import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import style from '../../styles/ItemCard.module.scss';

const VpsCard = ({ vpsItem, page }) => {
  const { t } = useTranslation("landing");

  return (
    <li className={style['card']} key={vpsItem.id}>
      <h3 className={style['card__title']}>{vpsItem.title}</h3>
      <p className={style.price}>
        {`$${vpsItem.price}/${t('order-price-period')}`}
      </p>
      {vpsItem.characters &&
        <>
          <>
            {vpsItem.characters[0] &&
              <p className={style.column}>
                <span>{`${t('card-item-cpu')}:`}</span>
                <span>
                  {`${vpsItem.characters[0].name} ${vpsItem.characters[0].content}`}
                </span>
              </p>
            }
            {vpsItem.characters[1] &&
              <p className={style.column}>
                <span>RAM</span>
                <span>
                  {`${vpsItem.characters[1].content}`}
                </span>
              </p>
            }
            {vpsItem.characters[2] &&
              <p className={style.column}>
                <span>{t('card-item-memory')}</span>
                <span>
                  {`${vpsItem.characters[2].name} ${vpsItem.characters[2].content}`}
                </span>
              </p>
            }
          </>
          <ul className={style.caracters}>
            {vpsItem.characters[0] &&
              <li>
                <span>{`${t('card-item-cpu')}:`}</span>
                <span>
                  {`${vpsItem.characters[0].name} ${vpsItem.characters[0].content}`}
                </span>
              </li>
            }
            {vpsItem.characters[1] &&
              <li>
                <span>RAM</span>
                <span>
                  {`${vpsItem.characters[1].content}`}
                </span>
              </li>
            }
            {vpsItem.characters[2] &&
              <li>
                <span>{t('card-item-memory')}</span>
                <span>
                  {`${vpsItem.characters[2].name} ${vpsItem.characters[2].content}`}
                </span>
              </li>
            }
          </ul>
        </>
      }
      <div className={style['card__order']}>
        <p className={style['card__price']}>
          {`$${vpsItem.price}/${t('order-price-period')}`}
        </p>
        <Link href={`/account/shop${page === 'vps' ? '' : `/${page}`}`}>
          {t('button-buy-item')}
        </Link>
      </div>
    </li>
  );
}

export default VpsCard;