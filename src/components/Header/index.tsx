import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import searchLogo from '../../assets/search.svg';
import { useStoreContext } from '../../context/StoreContext';
import styles from './Header.module.scss';
import logo from '/Rick_and_Morty.svg';

export default function Header() {
  const { search, setSearch } = useStoreContext();
  const [inputValue, setInputValue] = useState<string>(search);
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  const handleSearch = () => {
    setSearch(inputValue);
  };

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="logo" />

        <form className={styles.search} onSubmit={(e) => handleSubmit(e)}>
          <input
            autoComplete="off"
            name="search"
            type="search"
            placeholder="Input character name"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button type="submit">
            <img src={searchLogo} alt="search" />
          </button>
        </form>
      </div>
    </header>
  );
}
