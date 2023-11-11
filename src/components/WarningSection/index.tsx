import { ReactNode } from 'react';
import styles from './WarningSection.module.scss';
import globalStyles from '../../App.module.scss';

interface Props {
  children: ReactNode | ReactNode[];
}

export default function WarningSection({ children }: Props) {
  return (
    <div className={styles.warning}>
      <div className={globalStyles.container}>{children}</div>
    </div>
  );
}
