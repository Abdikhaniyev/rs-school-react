import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import searchLogo from '../../assets/search.svg';
import styles from './Header.module.scss';
import logo from '/Rick_and_Morty.svg';

interface Props {
  setSearch: (value: string) => void;
}

export default function Header({ setSearch }: Props) {
  const [, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>(localStorage.getItem('search') || '');
  const headerRef = useRef<HTMLElement | null>(null);

  const handleScroll = () => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition > headerHeight) {
        headerRef.current.classList.add(styles.scrolled);
      } else {
        headerRef.current.classList.remove(styles.scrolled);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    setSearch(inputValue);
    setSearchParams({ page: '1' });
  };

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="logo" />

        <div className={styles.search}>
          <input
            type="text"
            placeholder="Input character name"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button
            onClick={() => {
              handleSearch();
            }}
          >
            <img src={searchLogo} alt="search" />
          </button>
        </div>
      </div>
    </header>
  );
}
