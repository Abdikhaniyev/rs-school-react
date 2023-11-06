import { useEffect, useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import styles from './App.module.scss';
import { getCharacters } from './api/character';
import {
  Banner,
  BugButton,
  Characters,
  ErrorBoundary,
  Fallback,
  Footer,
  Header,
  Pagination,
  WarningSection,
} from './components';
import { Character, Info } from './interfaces';

export default function App() {
  const { characterId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(localStorage.getItem('search') || '');
  const current = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCharacters = async (search: string, page?: number) => {
    setLoading(true);
    getCharacters(search, page)
      .then((data) => {
        setError('');
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((error) => {
        setError(error.message);
        setCharacters([]);
      })
      .finally(() => {
        setLoading(false);
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
      <Header setSearch={handleChange} />
      <Banner />
      <WarningSection>
        <BugButton />
      </WarningSection>
      <div className={characterId ? styles.detailed : ''}>
        <Characters characters={characters} loading={loading} error={error} />
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
      <Footer />
    </ErrorBoundary>
  );
}
