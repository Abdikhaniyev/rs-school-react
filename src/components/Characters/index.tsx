import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Character } from '../../interfaces';
import { useGetCharactersQuery } from '../../redux/actions/character';
import { useAppSelector } from '../../redux/store';
import { ResponseError } from '../../redux/types/common';
import CharacterCard from '../CharacterCard';
import Spinner from '../Spinner';
import styles from './Characters.module.scss';

const home = import.meta.env.VITE_HOME_PAGE;

export default function Characters() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
  const [search] = useAppSelector((state) => [state.search.value]);
  const { data, isFetching, isError, error } = useGetCharactersQuery({ name: search, page });

  return (
    <div
      className={styles.characters}
      onClick={() => {
        characterId && navigate(`${home}/?${searchParams.toString()}`);
      }}
    >
      {isFetching && (
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className={styles.container}
        >
          <Spinner />
        </div>
      )}
      <div className={`${styles.container} ${characterId ? styles.vertical : ''}`}>
        {!isFetching &&
          !isError &&
          data?.results?.map((character: Character) => (
            <CharacterCard
              key={character.id}
              character={character}
              inline={characterId !== undefined}
              selected={characterId && parseInt(characterId) === character.id ? true : false}
            />
          ))}

        {!isFetching && isError && (
          <div className={styles['no-results']}>
            <h2>{(error as ResponseError).data.error}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
