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
  router?: 'memory' | 'browser';
  routerProps?: BrowserRouterProps | MemoryRouterProps;
}

interface OptionsWithStore extends Options {
  store: true;
  storeValues: StoreContextState;
}

function customRender(
  ui: ReactElement,
  options: Options | OptionsWithStore = {
    store: true,
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
    const Router = options.router === 'browser' ? BrowserRouter : MemoryRouter;
    if ((options as OptionsWithStore).store) {
      return (
        <StoreContext.Provider value={(options as OptionsWithStore).storeValues}>
          <Router {...options.routerProps}>{children}</Router>
        </StoreContext.Provider>
      );
    } else {
      return <Router {...options.routerProps}>{children}</Router>;
    }
  };

  return render(ui, {
    wrapper: Wrapper,
    ...options,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
