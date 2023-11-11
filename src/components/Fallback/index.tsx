import { ReactNode } from 'react';
import styles from './Fallback.module.scss';
import portal from '../../assets/portal2.png';

interface Props {
  children: ReactNode;
}

export default function Fallback({ children }: Props) {
  return (
    <div className={styles.fallback}>
      <div className={styles.container}>
        {children}
        <img src={portal} alt="Portal" />
      </div>
    </div>
  );
}
