import { act, fireEvent, render, screen } from '../../__tests__/utils';
import Header from './index';

describe('Header component', () => {
  it('saves search value to local storage when search button is clicked', () => {
    const mockSetSearch = vi.fn();
    mockSetSearch.mockImplementation((search: string) => {
      window.localStorage.setItem('search', search);
    });

    render(<Header />, {
      store: true,
      storeValues: {
        search: '',
        setSearch: mockSetSearch,
        page: 0,
        setPage: () => {},
        characters: {
          results: [],
          info: null,
          error: '',
          loading: false,
        },
        setCharacters: () => {},
        currentCharacter: {
          character: null,
          error: '',
          loading: false,
          info: null,
          episodes: [],
        },
        setCurrentCharacter: () => {},
      },
    });

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Rick Sanchez' } });
      fireEvent.click(searchButton);
    });

    expect(window.localStorage.getItem('search')).toBe('Rick Sanchez');
  });

  it('retrieves search value from local storage upon mounting', () => {
    window.localStorage.setItem('search', 'Morty Smith');

    render(<Header />, {
      store: true,
      storeValues: {
        search: window.localStorage.getItem('search') || '',
        setSearch: () => {},
        page: 0,
        setPage: () => {},
        characters: {
          results: [],
          info: null,
          error: '',
          loading: false,
        },
        setCharacters: () => {},
        currentCharacter: {
          character: null,
          error: '',
          loading: false,
          info: null,
          episodes: [],
        },
        setCurrentCharacter: () => {},
      },
    });

    expect(screen.getByTestId('search-input')).toHaveValue('Morty Smith');
  });
});
