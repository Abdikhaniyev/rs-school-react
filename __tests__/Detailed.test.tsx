import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import Page from '@/pages/character/[characterId]';
import { Character } from '@/redux/types/character';
import { PaginateResponse } from '@/redux/types/common';
import { Episode } from '@/redux/types/episode';
import { character } from '@/test-utils/api/handler';
import { createMockRouter } from '@/test-utils/createMockRouter';
import { render, screen } from '@/test-utils/utils';

describe('Detailed component', () => {
  async function gssp() {
    const characters = await fetch('https://rickandmortyapi.com/api/character');
    const charactersRes = (await characters.json()) as PaginateResponse<Character[]>;

    const character = await fetch('https://rickandmortyapi.com/api/character/1');
    const characterRes = (await character.json()) as Character;
    const episodes = await fetch('https://rickandmortyapi.com/api/episode/1');
    const episodesRes = (await episodes.json()) as Episode;

    return {
      props: {
        characters: charactersRes,
        isError: false,
        error: undefined,
        bannerCharacter: characterRes,
        character: characterRes,
        episodes: [episodesRes],
      },
    };
  }

  it('displays the detailed card data', async () => {
    const res = await gssp();
    const router = createMockRouter({});
    router.query = { characterId: '1' };

    render(
      <RouterContext.Provider value={router}>
        <Page {...res.props} />
      </RouterContext.Provider>
    );

    expect(screen.getAllByAltText(character.name)).toHaveLength(3);
    expect(screen.getByText(character.status)).toBeInTheDocument();
    expect(screen.getByText(character.species)).toBeInTheDocument();
    expect(screen.getByText(character.gender)).toBeInTheDocument();
    expect(screen.getByText(character.origin.name)).toBeInTheDocument();
    expect(screen.getByText(character.location.name)).toBeInTheDocument();
  });

  // it('hides the component when the close button is clicked', async () => {
  //   render(
  //     <Routes>
  //       <Route path="/rs-school-react/" element={<div>Home</div>} />,
  //       <Route path="/rs-school-react/character/:characterId" element={<Detailed />} />
  //     </Routes>,
  //     {
  //       router: 'memory',
  //       routerProps: { initialEntries: ['/rs-school-react/character/1'] },
  //     }
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText(character.name)).toBeInTheDocument();
  //   });

  //   await act(async () => {
  //     waitFor(() => {
  //       screen.getByTestId('back').click();
  //       expect(screen.getByText('Home')).toBeInTheDocument();
  //     });
  //   });
  // });
});
