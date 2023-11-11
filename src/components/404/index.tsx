import { useNavigate } from 'react-router-dom';
import image from '../../assets/404.webp';
import styles from './404.module.scss';

const home = import.meta.env.VITE_HOME_PAGE;

export default function Page404() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img src={image} alt="404" />
      <h1>The page you are looking for does not exist. Please go back to the home page.</h1>
      <button onClick={() => navigate(home)}>Back home</button>
    </div>
  );
}
