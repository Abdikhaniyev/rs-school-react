import { useRouter } from 'next/router';

import { setViewMode } from '@/redux/slices/layoutSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Character } from '@/redux/types/character';
import { PaginateResponse, ResponseError } from '@/redux/types/common';

import { CharacterCard, Spinner } from '.';

import styles from '@/styles/Characters.module.scss';

interface CharactersProps {
  characters: PaginateResponse<Character[]>;
  isError: boolean;
  error: ResponseError;
}

export default function Characters(props: CharactersProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { characters, isError, error } = props;
  const { charactersLoading } = useAppSelector((state) => state.layout);

  return (
    <div
      className={styles.characters}
      onClick={() => {
        if (router.query.characterId) {
          dispatch(setViewMode('grid'));
          router.push({
            pathname: '/',
            query: { page: router.query.page },
          });
        }
      }}
    >
      {charactersLoading && (
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className={styles.container}
        >
          <Spinner />
        </div>
      )}
      <div className={`${styles.container} ${router.query.characterId ? styles.vertical : ''}`}>
        {!charactersLoading &&
          !isError &&
          characters?.results?.map((character: Character) => (
            <CharacterCard
              key={character.id}
              character={character}
              inline={!!router.query.characterId}
              selected={router.query.characterId === character.id.toString()}
            />
          ))}

        {!charactersLoading && isError && (
          <div className={styles['no-results']}>
            <h2>{(error as ResponseError).data.error}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
