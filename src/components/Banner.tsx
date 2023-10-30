import { Component } from 'react';
import './Banner.css';
import Header from './Header';

interface Props {
  setSearch: (value: string) => void;
}

export class Banner extends Component<Props> {
  render() {
    return (
      <div className="banner">
        <Header setSearch={this.props.setSearch} />
      </div>
    );
  }
}

export default Banner;
