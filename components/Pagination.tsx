import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from '@/styles/Pagination.module.scss';

interface Props {
  count: number;
  current: number;
  pages: number;
}

export default function Pagination(props: Props) {
  const router = useRouter();
  const { query, pathname } = router;
  const { count, current, pages } = props;
  const [start, setStart] = useState<number>(current < 6 ? 1 : current - 5);
  const [end, setEnd] = useState<number>(current < 6 ? 10 : current + 4);
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const generatePagesArray = useCallback(() => {
    const pagesArray = [];
    for (let i = start; i <= end; i++) {
      if (i > pages) break;
      pagesArray.push(i);
    }

    setPagesArray(pagesArray);
  }, [end, pages, start]);

  useEffect(() => {
    setStart(current < 6 ? 1 : current - 5);
    setEnd(current < 6 ? 10 : current + 4);
    generatePagesArray();
  }, [current, count, generatePagesArray]);

  const handleChangePage = useCallback(
    (page: number) => {
      if (page > 0 && page <= pages) {
        router.push({
          pathname: pathname,
          query: { ...query, page },
        });
      }
    },
    [pages, pathname, query, router]
  );

  return (
    <div className={styles['pagination-container']}>
      <ul className={styles.pagination}>
        {current > 1 && (
          <li
            data-testid="pagination__item"
            className={styles['pagination__item']}
            onClick={() => handleChangePage(current - 1)}
          >
            <Image src="/left.svg" alt="prev" width={16} height={16} />
          </li>
        )}
        {pagesArray.map((page) => (
          <li
            key={page}
            data-testid="pagination__item"
            className={`${styles['pagination__item']} ${page === current ? styles.active : ''}`}
            onClick={() => handleChangePage(page)}
          >
            {page}
          </li>
        ))}
        {current < pages && (
          <li
            data-testid="pagination__item"
            className={styles['pagination__item']}
            onClick={() => handleChangePage(current + 1)}
          >
            <Image src="/right.svg" alt="next" width={16} height={16} />
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
            handleChangePage(parseInt(inputValue));
          }
        }}
      />
    </div>
  );
}
