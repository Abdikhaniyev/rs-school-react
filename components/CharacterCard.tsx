import { forwardRef, MouseEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { setViewMode } from '@/redux/slices/layoutSlice';
import { useAppDispatch } from '@/redux/store';
import { Character } from '@/redux/types/character';

import styles from '@/styles/CharacterCard.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  character: Character;
  inline?: boolean;
  bannerCard?: boolean;
  selected?: boolean;
}

const CharacterCard = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { character, inline, bannerCard, selected, ...otherProps } = props;
  const { name, image, status, species } = character ?? {};

  return (
    <div
      data-testid="character-card"
      className={`${styles['character-card']} ${inline ? styles['character-card--inline'] : ''} ${
        bannerCard ? styles['disabled'] : ''
      } ${selected ? styles['selected'] : ''}
      `}
      onClick={
        bannerCard || selected
          ? () => {}
          : (e: MouseEvent) => {
              e.stopPropagation();
              if (!selected) {
                dispatch(setViewMode('detailed'));
                router.push({
                  pathname: `/character/${character.id}`,
                  query: { page: router.query.page },
                });
              } else {
                dispatch(setViewMode('grid'));
                router.push({
                  pathname: '/',
                  query: { page: router.query.page },
                });
              }
            }
      }
      ref={ref}
      {...otherProps}
    >
      <div className={styles['character-card__image']}>
        <Image src={image} alt={name} width={300} height={300} />
      </div>
      <div className={styles['character-card__info']}>
        <h2>{name}</h2>

        <div className={styles.status}>
          <span className={`${styles['status__icon']} ${styles[status?.toLowerCase()]}`}></span>
          <span>
            {status} - {species}
          </span>
        </div>
      </div>
    </div>
  );
});

export default CharacterCard;
