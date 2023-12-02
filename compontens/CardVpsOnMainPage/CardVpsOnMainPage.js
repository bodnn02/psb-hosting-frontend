import Link from 'next/link';

import style from '../../styles/Main.module.scss';

const CardVpsOnMainPage = ({ country }) => {
  return (
    <li className={style.country__item}>
      <img src={country.flag} alt={country.country} className={style['country__item-img']}/>
        <h4 className={`${['h4-title']} ${style['country__item-title']}`}>{country.country}</h4>
        <ul className={style['country__item-info']}>
          {country.description.map(el => {
            return(
              <li key={country.description.indexOf(el)}>
                {el}
              </li>
            )
          })}
        </ul>
        <Link href={`/vds/#${country.country}`} className={style['country__item-btn']}>Show Plans</Link>
    </li>
  );
}

export default CardVpsOnMainPage;