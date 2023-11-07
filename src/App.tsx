import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
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
import { useStoreContext } from './context/StoreContext';
import { Info } from './interfaces';

export default function App() {
  const { characterId } = useParams();
  const { search, page, setPage, characters, setCharacters } = useStoreContext();
  const { results, info } = characters;

  const fetchCharacters = async (search: string, page?: number) => {
    setCharacters({ results: [], info: null, error: '', loading: true });
    getCharacters(search, page)
      .then((data) => {
        setCharacters({
          results: data.results,
          info: data.info,
          error: '',
          loading: false,
        });
      })
      .catch((error) => {
        setCharacters({ results: [], info: null, error: error.message, loading: false });
      });
  };

  useEffect(() => {
    fetchCharacters(search, page);
  }, [search, page]);

  return (
    <ErrorBoundary fallback={<Fallback>Something went wrong</Fallback>}>
      <Header />
      <Banner />
      <WarningSection>
        <BugButton />
      </WarningSection>
      <div className={characterId ? styles.detailed : ''}>
        <Characters />
        <Outlet />
      </div>
      {results?.length > 0 && info !== null && (
        <Pagination
          current={page}
          count={(info as Info)?.count}
          pages={(info as Info)?.pages}
          onChange={setPage}
        />
      )}
      <Footer />
    </ErrorBoundary>
  );
}
