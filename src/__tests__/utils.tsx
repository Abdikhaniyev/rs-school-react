import { RenderOptions, render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import {
  BrowserRouter,
  BrowserRouterProps,
  MemoryRouter,
  MemoryRouterProps,
} from 'react-router-dom';
import { StoreContext, StoreContextState } from '../context/StoreContext';

interface Options extends RenderOptions {
  storeValues: StoreContextState;
  router?: 'memory' | 'browser';
  routerProps?: BrowserRouterProps | MemoryRouterProps;
}

function customRender(
  ui: ReactElement,
  options: Options = {
    storeValues: {
      search: localStorage.getItem('search') || '',
      setSearch: () => {},
      page: 1,
      setPage: () => {},
      characters: { results: [], info: null, error: '', loading: false },
      setCharacters: () => {},
      currentCharacter: { character: null, episodes: [], info: null, error: '', loading: false },
      setCurrentCharacter: () => {},
    },
    router: 'browser',
    routerProps: {},
  }
) {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <StoreContext.Provider value={options.storeValues}>
        {options.router === 'browser' ? (
          <BrowserRouter {...options.routerProps}>{children}</BrowserRouter>
        ) : (
          <MemoryRouter {...options.routerProps}>{children}</MemoryRouter>
        )}
      </StoreContext.Provider>
    );
  };

  return render(ui, {
    wrapper: Wrapper,
    ...options,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
