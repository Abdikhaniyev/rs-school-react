import { MouseEvent, forwardRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Character } from '../../interfaces';
import styles from './CharacterCard.module.scss';
import { useAppDispatch } from '../../redux/store';
import { setViewMode } from '../../redux/slices/layoutSlice';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  character: Character;
  inline?: boolean;
  bannerCard?: boolean;
  selected?: boolean;
}

const home = import.meta.env.VITE_HOME_PAGE;

const CharacterCard = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { character, inline, bannerCard, selected, ...otherProps } = props;
  const { id, name, image, status, species } = character;

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
              dispatch(setViewMode('detailed'));
              navigate(
                `${home}/character/${id}${searchParams.toString() ? `?${searchParams}` : ''}`
              );
            }
      }
      ref={ref}
      {...otherProps}
    >
      <div className={styles['character-card__image']}>
        <img src={image} alt={name} />
      </div>
      <div className={styles['character-card__info']}>
        <h2>{name}</h2>

        <div className={styles.status}>
          <span className={`${styles['status__icon']} ${styles[status.toLowerCase()]}`}></span>
          <span>
            {status} - {species}
          </span>
        </div>
      </div>
    </div>
  );
});

export default CharacterCard;
