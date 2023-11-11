import * as router from 'react-router';
import { fireEvent, render, screen } from '../../__tests__/utils';
import { Character } from '../../interfaces';
import CharacterCard from './index';

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
    render(<CharacterCard character={mockCharacter} />);
    const name = screen.getByText(mockCharacter.name);
    const image = screen.getByAltText(mockCharacter.name);
    const status = screen.getByText(`${mockCharacter.status} - ${mockCharacter.species}`);
    expect(name).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });

  const navigate = vi.fn();
  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockReturnValue(navigate);
  });

  it('navigates to the character detail page when clicked', () => {
    const { container } = render(<CharacterCard character={mockCharacter} />);
    fireEvent.click(container.firstChild as Element);
    expect(navigate).toHaveBeenCalledWith(`/rs-school-react/character/${mockCharacter.id}`);
  });
});
