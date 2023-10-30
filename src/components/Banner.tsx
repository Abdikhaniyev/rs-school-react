import { Component } from 'react';
import './Banner.css';
import Header from './Header';

interface Props {
  search: string;
  setSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Banner extends Component<Props> {
  render() {
    return (
      <div className="banner">
        <Header search={this.props.search} setSearch={this.props.setSearch} />
      </div>
    );
  }
}

export default Banner;
