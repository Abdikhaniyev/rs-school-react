import React, { Component } from 'react';
import logo from '../assets/Rick_and_Morty.svg';
import searchLogo from '../assets/search.svg';
import './Header.css';

interface Props {
  search: string;
  setSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Header extends Component<Props> {
  headerRef = React.createRef<HTMLDivElement>();

  handleScroll = () => {
    if (this.headerRef.current) {
      const headerHeight = this.headerRef.current.offsetHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition > headerHeight) {
        this.headerRef.current.classList.add('scrolled');
      } else {
        this.headerRef.current.classList.remove('scrolled');
      }
    }
  };

  componentDidMount(): void {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <header className="header" ref={this.headerRef}>
        <div className="container">
          <img className="logo" src={logo} alt="logo" />

          <div className="search">
            <input
              type="text"
              placeholder="Input character name"
              value={this.props.search}
              onChange={this.props.setSearch}
            />
            <button>
              <img src={searchLogo} alt="search" />
            </button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
