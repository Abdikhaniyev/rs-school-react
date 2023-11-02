import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import {
  Banner,
  BugButton,
  Characters,
  ErrorBoundary,
  Fallback,
  Pagination,
  WarningSection,
} from './components';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { Character, Info } from './interfaces';
import { getCharacters } from './api/character';

export default function App() {
  const { characterId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(localStorage.getItem('search') || '');
  const current = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info | null>(null);
  const [error, setError] = useState<string>('');

  const fetchCharacters = async (search: string, page?: number) => {
    getCharacters(search, page)
      .then((data) => {
        setError('');
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((error) => {
        setError(error.message);
        setCharacters([]);
      });
  };

  useEffect(() => {
    fetchCharacters(search, current);
  }, [search, current]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleChange = (value: string) => {
    localStorage.setItem('search', value);
    setSearch(value);
  };

  return (
    <ErrorBoundary fallback={<Fallback>Something went wrong</Fallback>}>
      <Banner setSearch={handleChange} />
      <WarningSection>
        <BugButton />
      </WarningSection>
      <div className={characterId ? styles.detailed : ''}>
        <Characters characters={characters} error={error} />
        <Outlet />
      </div>
      {characters?.length > 0 && info !== null && (
        <Pagination
          current={current}
          count={(info as Info)?.count}
          pages={(info as Info)?.pages}
          onChange={handlePageChange}
        />
      )}
    </ErrorBoundary>
  );
}
