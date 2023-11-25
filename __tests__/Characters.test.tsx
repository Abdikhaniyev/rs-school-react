import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import Home from '@/pages';
import { Character } from '@/redux/types/character';
import { PaginateResponse, ResponseError } from '@/redux/types/common';
import { createMockRouter } from '@/test-utils/createMockRouter';
import { render, screen, waitFor } from '@/test-utils/utils';

describe('Characters component', () => {
  async function gssp(name?: string) {
    const characters = name
      ? await fetch(`https://rickandmortyapi.com/api/character?name=${name}`)
      : await fetch('https://rickandmortyapi.com/api/character');
    const charactersRes = (await characters.json()) as PaginateResponse<Character[]>;

    const character = await fetch('https://rickandmortyapi.com/api/character/1');
    const characterRes = (await character.json()) as Character;

    let error: ResponseError | undefined = undefined;
    if (charactersRes.error) {
      error = {
        status: 404,
        data: {
          error: charactersRes.error,
        },
      };
    }

    return {
      props: {
        characters: charactersRes,
        isError: !!charactersRes?.error,
        error: error,
        bannerCharacter: characterRes,
      },
    };
  }

  it('renders the correct number of cards', async () => {
    const res = await gssp();
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Home {...res.props} />
      </RouterContext.Provider>
    );

    await waitFor(() => {
      const cards = screen.getAllByTestId('character-card');
      expect(cards).toHaveLength(6); // with banner card
    });
  });

  it('displays a message if no cards are present', async () => {
    const res = await gssp('empty');
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Home {...res.props} />
      </RouterContext.Provider>
    );

    await waitFor(() => {
      const message = screen.getByText('There is nothing here');
      expect(message).toBeInTheDocument();
    });
  });
});
