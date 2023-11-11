import { useCallback, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getCharacter } from '../../api/character';
import { getEpisodes } from '../../api/episode';
import { useStoreContext } from '../../context/StoreContext';
import Spinner from '../Spinner';
import styles from './Detailed.module.scss';

const home = import.meta.env.VITE_HOME_PAGE;

export default function Detailed() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentCharacter, setCurrentCharacter } = useStoreContext();

  const { character, episodes, loading } = currentCharacter || {};
  const { name, image, status, species, location, gender, origin } = character || {};

  const fetchCharacterDetails = useCallback(
    async (id: string) => {
      setCurrentCharacter({ character: null, episodes: [], loading: true, error: '', info: null });
      getCharacter(id)
        .then((character) => {
          getEpisodes(character.episode).then((episodes) => {
            setCurrentCharacter({ character, episodes, loading: false, error: '', info: null });
          });
        })
        .catch((error) => {
          setCurrentCharacter({
            character: null,
            episodes: [],
            loading: false,
            error: error.message,
            info: null,
          });
        });
    },
    [setCurrentCharacter]
  );

  useEffect(() => {
    if (characterId) {
      fetchCharacterDetails(characterId);
    }
  }, [characterId, fetchCharacterDetails]);

  return (
    <div className={styles.character}>
      {loading && (
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className={styles.container}
        >
          <Spinner />
        </div>
      )}
      {!loading && character && (
        <div className={styles.container}>
          <div className={styles.avatar}>
            <img src={image} alt={name} />
          </div>
          <div className={styles.about}>
            <h1 className={styles.name}>
              {name}
              <button
                data-testid="back"
                onClick={() => {
                  navigate(`${home}/?${searchParams.toString()}`);
                }}
              >
                Back
              </button>
            </h1>
            <div className={styles.status}>
              <span>Status: </span>
              <span>
                <span
                  className={`${styles['status__icon']} ${status && styles[status.toLowerCase()]}`}
                />
                {status}
              </span>
            </div>
            <div>
              <span>Species: </span>
              <span>{species}</span>
            </div>
            <div>
              <span>Gender: </span>
              <span>{gender}</span>
            </div>
            <div>
              <span>Origin: </span>
              <span>{origin?.name}</span>
            </div>
            <div>
              <span>Last known location: </span>
              <span>{location?.name}</span>
            </div>
          </div>
          <div className={styles.episodes}>
            <h2>Episodes:</h2>
            {episodes?.map((episode) => (
              <div key={episode.id} className={styles.episode}>
                <h3>{episode.name}</h3>
                <span>{episode.episode}</span>
                <span>{episode.air_date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
