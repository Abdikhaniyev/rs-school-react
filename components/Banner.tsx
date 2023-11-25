import { MouseEvent, useRef } from 'react';
import Image from 'next/image';

import { Character } from '@/redux/types/character';

import { CharacterCard } from '.';

import styles from '@/styles/Banner.module.scss';

interface BannerProps {
  character: Character;
}

export default function Banner({ character }: BannerProps) {
  const ref = useRef<HTMLDivElement>(null);

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
        <CharacterCard ref={ref} bannerCard character={character} />
        <Image
          className={styles.portal}
          src="/portal.png"
          alt="portal"
          width={446}
          height={474}
          priority={true}
        />
      </div>
    </div>
  );
}
