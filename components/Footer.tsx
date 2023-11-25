import styles from '@/styles/Footer.module.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="https://rs.school/react/" target="_blank" className={styles.link} rel="noreferrer">
          The Rolling Scopes School
        </a>

        <span>&copy; {currentYear}</span>

        <a
          href="https://github.com/Abdikhaniyev"
          target="_blank"
          className={styles.link}
          rel="noreferrer"
        >
          Abdikhaniyev
        </a>
      </div>
    </footer>
  );
}
