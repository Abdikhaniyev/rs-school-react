import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <NavLink to={'/'}>
            <img src="/logo-rsschool.png" alt="logo" height={30} />
          </NavLink>
        </div>

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to={'/uncontrolled'}>Uncontrolled form</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to={'/controlled'}>Controlled form</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
