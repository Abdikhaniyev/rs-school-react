import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Character } from '../../interfaces';
import CharacterCard from '../CharacterCard';
import styles from './Characters.module.scss';
import Spinner from '../Spinner';
import { useStoreContext } from '../../context/StoreContext';

const home = import.meta.env.VITE_HOME_PAGE;

export default function Characters() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { characters } = useStoreContext();
  const { loading, error, results } = characters;

  return (
    <div
      className={styles.characters}
      onClick={() => {
        characterId && navigate(`${home}/?${searchParams.toString()}`);
      }}
    >
      {loading && (
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className={styles.container}
        >
          <Spinner />
        </div>
      )}
      <div className={`${styles.container} ${characterId ? styles.vertical : ''}`}>
        {!loading &&
          results?.map((character: Character) => (
            <CharacterCard
              key={character.id}
              character={character}
              inline={characterId !== undefined}
              selected={characterId && parseInt(characterId) === character.id ? true : false}
            />
          ))}

        {!loading && results?.length === 0 && (
          <div className={styles['no-results']}>
            <h2>{error}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
