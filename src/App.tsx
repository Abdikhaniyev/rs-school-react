import { Outlet, useSearchParams } from 'react-router-dom';
import styles from './App.module.scss';
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
import { useGetCharactersQuery } from './redux/actions/character';
import { useAppSelector } from './redux/store';

export default function App() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
  const { search, viewMode } = useAppSelector((state) => state.layout);
  const { data, isError } = useGetCharactersQuery({ name: search, page });

  return (
    <ErrorBoundary fallback={<Fallback>Something went wrong</Fallback>}>
      <Header />
      <Banner />
      <WarningSection>
        <BugButton />
      </WarningSection>
      <div className={viewMode === 'detailed' ? styles.detailed : ''}>
        <Characters />
        <Outlet />
      </div>
      {data && data.results && data.info !== undefined && !isError && (
        <Pagination current={page} count={data.info.count} pages={data.info.pages} />
      )}
      <Footer />
    </ErrorBoundary>
  );
}
