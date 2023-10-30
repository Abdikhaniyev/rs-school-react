import { Component } from 'react';
import { Character, Info } from '../interfaces';
import './Characters.css';
import Pagination from './Pagination';

interface Props {
  search: string;
}

interface State {
  current: number;
  characters: Character[];
  info: Info | null;
  error: string;
}

export class Characters extends Component<Props, State> {
  API_HOST = 'https://rickandmortyapi.com/api';
  CHARACTERS_ENDPOINT = `${this.API_HOST}/character`;

  state = {
    current: 1,
    characters: [],
    info: null,
    error: '',
  };

  fetchCharacters = async (search: string, page?: number) => {
    const response = await fetch(`${this.CHARACTERS_ENDPOINT}?name=${search}&page=${page ?? 1}`);
    const data = await response.json();
    if (data.error) {
      this.setState({ characters: [], error: data.error });
      return;
    }
    this.setState({
      characters: data.results,
      info: data.info,
    });
  };

  componentDidMount(): void {
    this.fetchCharacters(this.props.search);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (prevProps.search !== this.props.search) {
      this.setState({ current: 1 });
      this.fetchCharacters(this.props.search, this.state.current);
    }
    if (prevProps.search === this.props.search && prevState.current !== this.state.current) {
      this.fetchCharacters(this.props.search, this.state.current);
    }
  }

  handlePageChange = (page: number) => {
    this.setState({ current: page });
  };

  render() {
    return (
      <div className="characters">
        <div className="container">
          {this.state.characters?.map((character: Character) => (
            <div className="character-card" key={character.id}>
              <div className="character-card__image">
                <img src={character.image} alt={character.name} />
              </div>
              <div className="character-card__info">
                <h2>{character.name}</h2>

                <div className="status">
                  <span className={`status__icon ${character.status.toLowerCase()}`}></span>
                  <span>
                    {character.status} - {character.species}
                  </span>
                </div>

                <div className="location">
                  <h6>Last known location:</h6>
                  <p>{character.location.name}</p>
                </div>

                <div className="location">
                  <h6>First seen in:</h6>
                  <p>{character.origin.name}</p>
                </div>
              </div>
            </div>
          ))}

          {this.state.characters?.length === 0 && (
            <div className="no-results">
              <h2>{this.state.error}</h2>
            </div>
          )}
        </div>

        {this.state.characters?.length > 0 && this.state.info !== null && (
          <Pagination
            current={this.state.current}
            count={(this.state.info as Info)?.count}
            pages={(this.state.info as Info)?.pages}
            onChange={this.handlePageChange}
          />
        )}
      </div>
    );
  }
}

export default Characters;
