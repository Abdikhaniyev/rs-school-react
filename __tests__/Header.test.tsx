import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { createMockRouter } from '@/test-utils/createMockRouter';

import Header from '../components/Header';
import { setSearch } from '../redux/slices/layoutSlice';
import { setupStore } from '../redux/store';
import { act, fireEvent, render, screen } from '../test-utils/utils';

describe('Header component', () => {
  it('saves search value to local storage when search button is clicked', () => {
    const store = setupStore();
    store.dispatch(setSearch(''));
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Header />
      </RouterContext.Provider>
    );

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Rick Sanchez' } });
      fireEvent.click(searchButton);
    });

    expect(window.localStorage.getItem('search')).toBe('Rick Sanchez');
  });
});
