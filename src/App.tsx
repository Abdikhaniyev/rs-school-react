import { Component } from 'react';
import './App.css';
import Banner from './components/Banner';
import BugButton from './components/BugButton';
import Characters from './components/Characters';
import ErrorBoundary from './components/ErrorBoundary';
import Fallback from './components/Fallback';
import WarningSection from './components/WarningSection';

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
      <ErrorBoundary fallback={<Fallback>Something went wrong</Fallback>}>
        <Banner setSearch={this.handleChange} />
        <WarningSection>
          <BugButton />
        </WarningSection>
        <Characters search={this.state.search} />
      </ErrorBoundary>
    );
  }
}

export default App;
