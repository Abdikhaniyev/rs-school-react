import '@testing-library/jest-dom';
import { server } from '../mock/api/server';
import { CharacterApi } from '../redux/actions/character';
import { EpisodeApi } from '../redux/actions/episode';
import { setupStore } from '../redux/store';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(CharacterApi.util.resetApiState());
  store.dispatch(EpisodeApi.util.resetApiState());
});

afterAll(() => server.close());
