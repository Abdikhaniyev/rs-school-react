import Image from 'next/image';
import { useRouter } from 'next/router';

import { setViewMode } from '@/redux/slices/layoutSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Character } from '@/redux/types/character';
import { Episode } from '@/redux/types/episode';

import { Spinner } from '.';

import styles from '@/styles/Detailed.module.scss';

interface DetailedProps {
  characterData: Character;
  episodesData: Episode[];
}

export default function Detailed(props: DetailedProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { characterData, episodesData } = props;
  const { characterLoading, episodesLoading } = useAppSelector((state) => state.layout);

  const { name, image, status, species, location, gender, origin } = characterData || {};

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
            <Image src={image as string} alt={name as string} width={300} height={300} />
          </div>
          <div className={styles.about}>
            <h1 className={styles.name}>
              {name}
              <button
                data-testid="back"
                onClick={() => {
                  dispatch(setViewMode('grid'));
                  router.push({
                    pathname: '/',
                    query: { page: router.query.page },
                  });
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
