import { createContext, useContext, useState } from 'react';
import { Character, Episode, Info } from '../interfaces';
import { useSearchParams } from 'react-router-dom';

interface FetchState {
  info: Info | null;
  error: string;
  loading: boolean;
}

interface CharactersState extends FetchState {
  results: Character[];
}

interface CharacterState extends FetchState {
  character: Character | null;
  episodes: Episode[];
}

interface StoreContextState {
  search: string;
  setSearch: (search: string) => void;
  page: number;
  setPage: (page: number) => void;
  characters: CharactersState;
  setCharacters: (characters: CharactersState) => void;
  currentCharacter: CharacterState;
  setCurrentCharacter: (character: CharacterState) => void;
}

export const StoreContext = createContext<StoreContextState>({
  search: localStorage.getItem('search') || '',
  setSearch: () => {},
  page: 1,
  setPage: () => {},
  characters: { results: [], info: null, error: '', loading: false },
  setCharacters: () => {},
  currentCharacter: { character: null, episodes: [], info: null, error: '', loading: false },
  setCurrentCharacter: () => {},
});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(localStorage.getItem('search') || '');
  const [page, setPage] = useState<number>(
    searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1
  );
  const [characters, setCharacters] = useState<CharactersState>({
    results: [],
    info: null,
    error: '',
    loading: false,
  });
  const [currentCharacter, setCurrentCharacter] = useState<CharacterState>({
    character: null,
    episodes: [],
    info: null,
    error: '',
    loading: false,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
    setSearchParams({ page: page.toString() });
  };

  const handleSearch = (search: string) => {
    localStorage.setItem('search', search);
    setSearch(search);
    handlePageChange(1);
  };

  return (
    <StoreContext.Provider
      value={{
        search,
        setSearch: handleSearch,
        page,
        setPage: handlePageChange,
        characters,
        setCharacters,
        currentCharacter,
        setCurrentCharacter,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
StoreProvider.displayName = 'StoreProvider';

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
};
