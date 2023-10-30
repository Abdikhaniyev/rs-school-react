import React, { Component } from 'react';
import logo from '/Rick_and_Morty.svg';
import searchLogo from '../assets/search.svg';
import './Header.css';

interface Props {
  setSearch: (value: string) => void;
}

interface State {
  inputValue: string;
}

export class Header extends Component<Props, State> {
  state = {
    inputValue: localStorage.getItem('search') || '',
  };

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
              value={this.state.inputValue}
              onChange={(e) => {
                this.setState({ inputValue: e.target.value });
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  this.props.setSearch(this.state.inputValue);
                }
              }}
            />
            <button
              onClick={() => {
                this.props.setSearch(this.state.inputValue);
              }}
            >
              <img src={searchLogo} alt="search" />
            </button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
