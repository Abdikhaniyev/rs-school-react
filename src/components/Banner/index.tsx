import Header from '../Header';
import styles from './Banner.module.scss';

interface Props {
  setSearch: (value: string) => void;
}

export default function Banner({ setSearch }: Props) {
  return (
    <div className={styles.banner}>
      <Header setSearch={setSearch} />
    </div>
  );
}
