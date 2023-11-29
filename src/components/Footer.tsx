export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          The Rolling Scopes School
        </a>

        <span>&copy; {currentYear}</span>

        <a href="https://github.com/Abdikhaniyev" target="_blank" rel="noreferrer">
          Abdikhaniyev
        </a>
      </div>
    </footer>
  );
}
