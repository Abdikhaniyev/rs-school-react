import { Route, Routes } from 'react-router-dom';
import { act, render, screen } from '../../__tests__/utils';
import { Character } from '../../interfaces';
import Detailed from './index';

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

describe('Detailed component', () => {
  it('displays a loading indicator while fetching data', async () => {
    render(<Detailed />, {
      storeValues: {
        currentCharacter: {
          character: null,
          episodes: [],
          loading: true,
          error: '',
          info: null,
        },
        search: '',
        setSearch: () => {},
        page: 1,
        setPage: () => {},
        characters: {
          results: [],
          loading: false,
          error: '',
          info: null,
        },
        setCharacters: () => {},
        setCurrentCharacter: () => {},
      },
    });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays the detailed card data', async () => {
    render(<Detailed />, {
      storeValues: {
        currentCharacter: {
          character: mockCharacter,
          episodes: [],
          loading: false,
          error: '',
          info: null,
        },
        search: '',
        setSearch: () => {},
        page: 1,
        setPage: () => {},
        characters: {
          results: [],
          loading: false,
          error: '',
          info: null,
        },
        setCharacters: () => {},
        setCurrentCharacter: () => {},
      },
    });

    expect(screen.getByAltText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.origin.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.location.name)).toBeInTheDocument();
  });

  it('hides the component when the close button is clicked', async () => {
    act(() => {
      render(
        <Routes>
          <Route path="/rs-school-react/" element={<div>Home</div>} />,
          <Route path="/rs-school-react/character/:characterId" element={<Detailed />} />,
        </Routes>,
        {
          storeValues: {
            currentCharacter: {
              character: mockCharacter,
              episodes: [],
              loading: false,
              error: '',
              info: null,
            },
            search: '',
            setSearch: () => {},
            page: 1,
            setPage: () => {},
            characters: {
              results: [],
              loading: false,
              error: '',
              info: null,
            },
            setCharacters: () => {},
            setCurrentCharacter: () => {},
          },
          router: 'memory',
          routerProps: { initialEntries: [`/rs-school-react/character/${mockCharacter.id}`] },
        }
      );
    });

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();

    act(() => {
      screen.getByTestId('back').click();
    });

    expect(screen.queryByText(mockCharacter.name)).not.toBeInTheDocument();
  });
});
