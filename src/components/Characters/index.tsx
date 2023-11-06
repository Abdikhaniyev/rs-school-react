import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Character } from '../../interfaces';
import CharacterCard from '../CharacterCard';
import styles from './Characters.module.scss';
import Spinner from '../Spinner';

interface Props {
  characters: Character[];
  loading: boolean;
  error: string;
}

const home = import.meta.env.VITE_HOME_PAGE;

export default function Characters({ characters, loading, error }: Props) {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.characters}>
      {loading && (
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className={styles.container}
        >
          <Spinner />
        </div>
      )}
      <div
        onClick={() => {
          characterId && navigate(`${home}/?${searchParams.toString()}`);
        }}
        className={`${styles.container} ${characterId ? styles.vertical : ''}`}
      >
        {!loading &&
          characters?.map((character: Character) => (
            <CharacterCard
              key={character.id}
              character={character}
              inline={characterId !== undefined}
            />
          ))}

        {!loading && characters?.length === 0 && (
          <div className={styles['no-results']}>
            <h2>{error}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
