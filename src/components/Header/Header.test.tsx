import { act, fireEvent, render, screen } from '../../__tests__/utils';
import { setSearch } from '../../redux/slices/layoutSlice';
import { setupStore } from '../../redux/store';
import Header from './index';

describe('Header component', () => {
  it('saves search value to local storage when search button is clicked', () => {
    const store = setupStore();
    store.dispatch(setSearch(''));

    render(<Header />, { store: store });

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Rick Sanchez' } });
      fireEvent.click(searchButton);
    });

    expect(window.localStorage.getItem('search')).toBe('Rick Sanchez');
  });
  it('retrieves search value from local storage upon mounting', () => {
    const store = setupStore();
    store.dispatch(setSearch('Morty Smith'));

    render(<Header />, { store: store });

    expect(screen.getByTestId('search-input')).toHaveValue('Morty Smith');
  });
});
