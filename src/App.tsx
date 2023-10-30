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

  handleChange = (value: string) => {
    localStorage.setItem('search', value);
    this.setState({ search: value });
  };

  render() {
    return (
      <>
        <Banner setSearch={this.handleChange} />
        <Characters search={this.state.search} />
      </>
    );
  }
}

export default App;
