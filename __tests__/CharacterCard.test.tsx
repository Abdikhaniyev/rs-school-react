import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { CharacterCard } from '@/components';
import Home from '@/pages/index';
import { Character } from '@/redux/types/character';
import { PaginateResponse } from '@/redux/types/common';
import { createMockRouter } from '@/test-utils/createMockRouter';
import { act, fireEvent, render, screen } from '@/test-utils/utils';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

describe('CharacterCard component', () => {
  it('renders the character name, image, status, and species', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <CharacterCard character={mockCharacter} />
      </RouterContext.Provider>
    );
    const name = screen.getByText(mockCharacter.name);
    const image = screen.getByAltText(mockCharacter.name);
    const status = screen.getByText(`${mockCharacter.status} - ${mockCharacter.species}`);
    expect(name).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });

  async function gssp() {
    const characters = await fetch('https://rickandmortyapi.com/api/character');
    const charactersRes = (await characters.json()) as PaginateResponse<Character[]>;

    const character = await fetch('https://rickandmortyapi.com/api/character/1');
    const characterRes = (await character.json()) as Character;

    return {
      props: {
        characters: charactersRes,
        isError: false,
        error: undefined,
        bannerCharacter: characterRes,
      },
    };
  }

  it('navigates to the character detail page when clicked', async () => {
    const res = await gssp();
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <Home {...res.props} />
      </RouterContext.Provider>
    );
    const characterCards = screen.getAllByTestId('character-card');
    const { push } = router;
    expect(push).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.click(characterCards[1]);
    });
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith({ pathname: '/character/1', query: { page: undefined } });
  });
});
