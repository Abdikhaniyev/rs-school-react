import { ReactNode } from 'react';

import layoutStyles from '@/styles/Layout.module.scss';
import styles from '@/styles/WarningSection.module.scss';

interface Props {
  children: ReactNode | ReactNode[];
}

export default function WarningSection({ children }: Props) {
  return (
    <div className={styles.warning}>
      <div className={layoutStyles.container}>{children}</div>
    </div>
  );
}
