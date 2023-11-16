import { MouseEvent, useRef } from 'react';
import portal from '../../assets/portal.png';
import { useGetCharacterQuery } from '../../redux/actions/character';
import CharacterCard from '../CharacterCard';
import styles from './Banner.module.scss';

export default function Banner() {
  const ref = useRef<HTMLDivElement>(null);
  const { data, isFetching } = useGetCharacterQuery({ id: '1' });

  const onMouseMove = (event: MouseEvent) => {
    const { pageX, pageY } = event;
    const x = (window.innerWidth / 2 - pageX) / 32;
    const y = (window.innerHeight / 2 - pageY) / 20 + 15;

    requestAnimationFrame(() => {
      if (ref.current) {
        const transform = `rotateX(${y}deg) rotateY(${x}deg) rotateZ(-9deg)`;
        ref.current.style.transform = transform;
      }
    });
  };

  const onMouseLeave = () => {
    requestAnimationFrame(() => {
      if (ref.current) {
        const transform = `rotateX(16deg) rotateY(0deg) rotateZ(-9deg)`;
        ref.current.style.transform = transform;
      }
    });
  };

  return (
    <div className={styles.banner} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className={styles['banner-left']}>Rick and Morty</div>
      <div className={styles['banner-right']}>
        {!isFetching && data && <CharacterCard ref={ref} bannerCard character={data} />}
        <img className={styles.portal} src={portal} alt="portal" />
      </div>
    </div>
  );
}
