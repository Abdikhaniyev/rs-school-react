import { Component } from 'react';
import './App.css';
import Banner from './components/Banner';
import Characters from './components/Characters';

interface Props {}

interface State {
  search: string;
}

export class App extends Component<Props, State> {
  state = {
    search: localStorage.getItem('search') || '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('search', event.target.value);
    this.setState({ search: event.target.value });
  };

  render() {
    return (
      <>
        <Banner search={this.state.search} setSearch={this.handleChange} />
        <Characters search={this.state.search} />
      </>
    );
  }
}

export default App;
