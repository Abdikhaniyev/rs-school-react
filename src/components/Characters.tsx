import { Component } from 'react';
import './Characters.css';
import { Character } from '../interfaces';

interface Props {
  search: string;
}

interface State {
  characters: Character[];
}

export class Characters extends Component<Props, State> {
  API_HOST = 'https://rickandmortyapi.com/api';
  CHARACTERS_ENDPOINT = `${this.API_HOST}/character`;

  state = {
    characters: [],
  };

  fetchCharacters = async (search: string) => {
    const response = await fetch(`${this.CHARACTERS_ENDPOINT}?name=${search}`);
    const data = await response.json();
    this.setState({ characters: data.results });
  };

  componentDidMount(): void {
    this.fetchCharacters(this.props.search);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.search !== this.props.search) {
      this.fetchCharacters(this.props.search);
    }
  }

  render() {
    return (
      <div className="characters">
        <div className="container">
          {this.state.characters.map((character: Character) => (
            <div key={character.id}>
              <img src={character.image} alt={character.name} />
              <h2>{character.name}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Characters;
