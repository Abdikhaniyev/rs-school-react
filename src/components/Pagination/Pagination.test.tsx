import { Route, Routes } from 'react-router-dom';
import { act, render, screen } from '../../__tests__/utils';
import Pagination from './index';

describe('Pagination component', () => {
  it('updates URL query parameter when page changes', () => {
    vi.spyOn(window.location, 'href', 'get');
    const mockSetPage = vi.fn();

    mockSetPage.mockImplementation((page: number) => {
      window.location.href = `http://localhost/?page=${page}`;
    });

    render(
      <Routes>
        <Route path="/" element={<Pagination count={200} current={1} pages={10} />} />
      </Routes>,
      {
        router: 'memory',
        store: true,
        storeValues: {
          search: '',
          setSearch: () => {},
          page: 0,
          setPage: (page: number) => {
            mockSetPage(page);
          },
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
      }
    );

    act(() => {
      screen.queryAllByTestId('pagination__item')[1].click();
    });

    expect(mockSetPage).toHaveBeenCalledWith(2);

    expect(window.location.href).toBe('http://localhost/?page=2');
  });
});
