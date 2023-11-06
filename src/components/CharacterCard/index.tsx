import { forwardRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Character } from '../../interfaces';
import styles from './CharacterCard.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  character: Character;
  inline?: boolean;
  bannerCard?: boolean;
}

const home = import.meta.env.VITE_HOME_PAGE;

const CharacterCard = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { character, inline, bannerCard, ...otherProps } = props;
  const { id, name, image, status, species } = character;

  return (
    <div
      className={`${styles['character-card']} ${inline ? styles['character-card--inline'] : ''} ${
        bannerCard ? styles['disabled'] : ''
      }`}
      onClick={bannerCard ? () => {} : () => navigate(`${home}/character/${id}?${searchParams}`)}
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
