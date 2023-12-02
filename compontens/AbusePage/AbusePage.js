import { useState, useEffect } from 'react';

import { useAppSelector } from '../../store/hooks';
import VpsCard from '../VpsCard/VpsCard';
import { Filters } from '../Filters/Filters';

import style from './AbusePage.module.scss';

export const AbusePage = () => {
  const [price, setPrice] = useState([80, 630]);
  const [cpu, setCpu] = useState([2, 32]);
  const [ram, setRam] = useState([4, 256]);
  const [ssd, setSsd] = useState([20, 2000]);
  const [currentBulletproofList, setCurrentBulletproofList] = useState([]);

  const vdsVpsBulletproof = useAppSelector(store => store.vdsVpsBulletproof.vdsVpsBulletproof);

  useEffect(() => {
    currentBulletproofList &&
      setCurrentBulletproofList(vdsVpsBulletproof.filter(el => {
        const elCpu = el.characters[0] && Number(el.characters[0].content.slice(0, -1));
        const elRam = el.characters[1] && Number(el.characters[1].content.slice(0, -2));
        const elSsd = el.characters[2] && (
          el.characters[2].content.includes('TB') ? Number(el.characters[2].content.slice(0, -2)) * 1000 : Number(el.characters[2].content.slice(0, -2))
        );

        return (
          (el.price <= price[1] && el.price >= price[0]) &&
          (elCpu <= cpu[1] && elCpu >= cpu[0]) &&
          (elRam <= ram[1] && elRam >= ram[0]) &&
          (elSsd <= ssd[1] && elSsd >= ssd[0])
        );
      }));
  }, [price[0], price[1], cpu[1], cpu[0], ram[0], ram[1], ssd[0], ssd[1]]);

  useEffect(() => {
    vdsVpsBulletproof && setCurrentBulletproofList(vdsVpsBulletproof);
  }, [vdsVpsBulletproof]);

  return (
    <div className={style.page}>
      <section className={style.products}>
        <Filters
          price={price}
          setPrice={setPrice}
          cpu={cpu}
          setCpu={setCpu}
          ram={ram}
          setRam={setRam}
          ssd={ssd}
          setSsd={setSsd}
          initialPrice={[80, 630]}
          initialCpu={[2, 32]}
          initialRam={[4, 256]}
          initialSsd={[20, 2000]}
          className={style.filters}
          classButton={style.buttonFilters}
          classList={style.filtersList}
        />
        <ul className={style['abuse__list']}>
          {currentBulletproofList && currentBulletproofList.map((el, ind) => {
            return (
              <VpsCard
                key={ind}
                vpsItem={el}
                page='bulletproof'
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}