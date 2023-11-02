import { ReactNode } from 'react';
import styles from './Fallback.module.scss';

interface Props {
  children: ReactNode;
}

export default function Fallback({ children }: Props) {
  return (
    <div className={styles.fallback}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
