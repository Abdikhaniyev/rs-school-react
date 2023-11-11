import { render, screen } from '../../__tests__/utils';
import { CharactersState } from '../../context/StoreContext';
import Characters from './index';

describe('Characters component', () => {
  it('renders the correct number of cards', () => {
    const mockCharacters: CharactersState = {
      loading: false,
      error: '',
      info: null,
      results: [
        {
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
        },
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'unknown',
            url: '',
          },
          location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          url: 'https://rickandmortyapi.com/api/character/2',
          created: '2017-11-04T18:50:21.651Z',
        },
        {
          id: 3,
          name: 'Summer Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Female',
          origin: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          location: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/6'],
          url: 'https://rickandmortyapi.com/api/character/3',
          created: '2017-11-04T19:09:56.428Z',
        },
      ],
    };

    render(<Characters />, {
      storeValues: {
        search: '',
        setSearch: () => {},
        page: 1,
        setPage: () => {},
        characters: mockCharacters,
        setCharacters: () => {},
        currentCharacter: { character: null, episodes: [], info: null, error: '', loading: false },
        setCurrentCharacter: () => {},
      },
    });
    const cards = screen.getAllByTestId('character-card');
    expect(cards).toHaveLength(mockCharacters.results.length);
  });

  it('displays a message if no cards are present', () => {
    const mockCharacters: CharactersState = {
      loading: false,
      error: 'There is nothing here',
      info: null,
      results: [],
    };
    render(<Characters />, {
      storeValues: {
        search: '',
        setSearch: () => {},
        page: 1,
        setPage: () => {},
        characters: mockCharacters,
        setCharacters: () => {},
        currentCharacter: { character: null, episodes: [], info: null, error: '', loading: false },
        setCurrentCharacter: () => {},
      },
    });
    const message = screen.getByText('There is nothing here');
    expect(message).toBeInTheDocument();
  });
});
