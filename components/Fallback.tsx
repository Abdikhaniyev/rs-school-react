import { ReactNode } from 'react';
import Image from 'next/image';

import styles from '@/styles/Fallback.module.scss';

interface Props {
  children: ReactNode;
}

export default function Fallback({ children }: Props) {
  return (
    <div className={styles.fallback}>
      <div className={styles.container}>
        {children}
        <Image src="/portal2.png" alt="Portal" />
      </div>
    </div>
  );
}
