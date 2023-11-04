import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getCharacter } from '../../api/character';
import { getEpisodes } from '../../api/episode';
import { Character, Episode } from '../../interfaces';
import styles from './Detailed.module.scss';
import Spinner from '../Spinner';

const home = import.meta.env.VITE_HOME_PAGE;

export default function Detailed() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { name, image, status, species, location, gender, origin, episode } = character || {};

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

  const fetchEpisodes = async (episodes: (string | undefined)[]) => {
    if (episodes?.length === 0) {
      setEpisodes([]);
      return;
    }
    getEpisodes(episodes).then((data) => {
      setEpisodes(data);
    });
  };

  useEffect(() => {
    if (characterId) {
      fetchCharacter(characterId);
    }
  }, [characterId]);

  useEffect(() => {
    if (episode) {
      fetchEpisodes(episode);
    }
  }, [episode]);

  return (
    <div className={styles.container}>
      {loading && (
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className={styles.container}
        >
          <Spinner />
        </div>
      )}
      {!loading && character && (
        <div className={styles.character}>
          <div className={styles.avatar}>
            <img src={image} alt={name} />
          </div>
          <div className={styles.about}>
            <h1 className={styles.name}>
              {name}
              <button
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
