import { useNavigate, useSearchParams } from 'react-router-dom';
import { Character } from '../../interfaces';
import styles from './CharacterCard.module.scss';

interface Props {
  inline?: boolean;
  character: Character;
}

export default function CharacterCard({ inline, character }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id, name, image, status, species, location, origin } = character;

  return (
    <div
      className={`${styles['character-card']} ${inline ? styles['character-card--inline'] : ''}`}
      onClick={() => navigate(`/character/${id}?${searchParams}`)}
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

        <div className={styles.location}>
          <h6>Last known location:</h6>
          <p>{location.name}</p>
        </div>

        <div className={styles.location}>
          <h6>First seen in:</h6>
          <p>{origin.name}</p>
        </div>
      </div>
    </div>
  );
}
