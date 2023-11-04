import { useEffect, useState } from 'react';
import leftIcon from '../../assets/left.svg';
import rightIcon from '../../assets/right.svg';
import styles from './Pagination.module.scss';

interface Props {
  count: number;
  current: number;
  pages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ count, current, pages, onChange }: Props) {
  const [start, setStart] = useState<number>(current < 6 ? 1 : current - 5);
  const [end, setEnd] = useState<number>(current < 6 ? 10 : current + 4);
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const generatePagesArray = () => {
    const pagesArray = [];
    for (let i = start; i <= end; i++) {
      if (i > pages) break;
      pagesArray.push(i);
    }

    setPagesArray(pagesArray);
  };

  useEffect(() => {
    setStart(current < 6 ? 1 : current - 5);
    setEnd(current < 6 ? 10 : current + 4);
    generatePagesArray();
  }, [current, count]);

  return (
    <div className={styles['pagination-container']}>
      <ul className={styles.pagination}>
        {current > 1 && (
          <li className={styles['pagination__item']} onClick={() => onChange(current - 1)}>
            <img src={leftIcon} alt="prev" />
          </li>
        )}
        {pagesArray.map((page) => (
          <li
            key={page}
            className={`${styles['pagination__item']} ${page === current ? styles.active : ''}`}
            onClick={() => onChange(page)}
          >
            {page}
          </li>
        ))}
        {current < pages && (
          <li className={styles['pagination__item']} onClick={() => onChange(current + 1)}>
            <img src={rightIcon} alt="next" />
          </li>
        )}
      </ul>

      <p>
        Showing {current} of {pages} pages
      </p>

      <input
        type="number"
        placeholder="Go to page"
        min={1}
        max={pages}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value && value > 0 && value <= pages) {
            setInputValue(e.target.value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange(parseInt(inputValue));
          }
        }}
      />
    </div>
  );
}
