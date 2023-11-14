import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLazyGetCharacterQuery } from '../../redux/actions/character';
import { useLazyGetEpisodesQuery } from '../../redux/actions/episode';
import { setViewMode } from '../../redux/slices/layoutSlice';
import { useAppDispatch } from '../../redux/store';
import { Episode } from '../../redux/types/episode';
import Spinner from '../Spinner';
import styles from './Detailed.module.scss';

const home = import.meta.env.VITE_HOME_PAGE;

export default function Detailed() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [fetchCharacter, { data: characterData, isLoading: characterLoading }] =
    useLazyGetCharacterQuery();
  const [fetchEpisodes, { data: episodesData, isLoading: episodesLoading }] =
    useLazyGetEpisodesQuery();

  const { name, image, status, species, location, gender, origin } = characterData || {};

  useEffect(() => {
    if (characterId) {
      fetchCharacter({ id: characterId });
    }
    if (characterData) {
      fetchEpisodes({ episodes: characterData.episode });
    }
  }, [characterData, characterId, fetchCharacter, fetchEpisodes]);

  return (
    <div className={styles.character}>
      {characterLoading && (
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className={styles.container}
        >
          <Spinner />
        </div>
      )}
      {!characterLoading && characterData && (
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
                  dispatch(setViewMode('grid'));
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
          {episodesLoading && (
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className={styles.container}
            >
              <Spinner />
            </div>
          )}
          {episodesData && (
            <div className={styles.episodes}>
              <h2>Episodes:</h2>
              {(episodesData as Episode[])?.map((episode) => (
                <div key={episode.id} className={styles.episode}>
                  <h3>{episode.name}</h3>
                  <span>{episode.episode}</span>
                  <span>{episode.air_date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
