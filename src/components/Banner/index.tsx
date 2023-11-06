import { MouseEvent, useEffect, useRef, useState } from 'react';
import { getCharacter } from '../../api/character';
import portal from '../../assets/portal.png';
import { Character } from '../../interfaces';
import CharacterCard from '../CharacterCard';
import styles from './Banner.module.scss';

export default function Banner() {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [character, setCharacter] = useState<Character | undefined>(undefined);

  const fetchCharacter = async (id: string) => {
    setLoading(true);
    getCharacter(id)
      .then((data) => {
        setCharacter(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCharacter('1');
  }, []);

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
        {!loading && character && <CharacterCard ref={ref} bannerCard character={character} />}
        <img className={styles.portal} src={portal} alt="portal" />
      </div>
    </div>
  );
}
