import { useParams } from 'react-router-dom';
import { Character } from '../../interfaces';
import CharacterCard from '../CharacterCard';
import styles from './Characters.module.scss';

interface Props {
  characters: Character[];
  error: string;
}

export default function Characters({ characters, error }: Props) {
  const { characterId } = useParams();

  return (
    <div className={styles.characters}>
      <div className={`${styles.container} ${characterId ? styles.vertical : ''}`}>
        {characters?.map((character: Character) => (
          <CharacterCard
            key={character.id}
            character={character}
            inline={characterId !== undefined}
          />
        ))}

        {characters?.length === 0 && (
          <div className={styles['no-results']}>
            <h2>{error}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
