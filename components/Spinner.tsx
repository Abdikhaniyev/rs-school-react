import styles from '@/styles/Spinner.module.scss';

export default function Spinner() {
  return <span data-testid="spinner" className={styles.loader}></span>;
}
