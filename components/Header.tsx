import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { setSearch } from '../redux/slices/layoutSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

import styles from '@/styles/Header.module.scss';

export default function Header() {
  const search = useAppSelector((state) => state.layout.search);
  const dispatch = useAppDispatch();
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
    dispatch(setSearch(inputValue));
  };

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.container}>
        <Image
          className={styles.logo}
          src="/Rick_and_Morty.svg"
          priority={true}
          width="158"
          height="48"
          alt="logo"
        />

        <form className={styles.search} onSubmit={(e) => handleSubmit(e)}>
          <input
            data-testid="search-input"
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
          <button type="submit" data-testid="search-button">
            <Image src="/search.svg" width="20" height="20" alt="search" />
          </button>
        </form>
      </div>
    </header>
  );
}
