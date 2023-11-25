// Learn more: https://github.com/testing-library/jest-dom
import { CharacterApi } from './redux/actions/character';
import { EpisodeApi } from './redux/actions/episode';
import { setupStorePreloaded } from './redux/store';
import { server } from './test-utils/api/server';

import '@testing-library/jest-dom';

const store = setupStorePreloaded({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(CharacterApi.util.resetApiState());
  store.dispatch(EpisodeApi.util.resetApiState());
});

afterAll(() => server.close());
