import { useState } from 'react';
import warningLogo from '../../assets/warning.svg';
import styles from './BugButton.module.scss';

export default function BugButton() {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(true);
  };

  if (clicked) {
    throw new Error('Oh no you clicked me');
  }
  return (
    <button className={styles['warning-button']} onClick={handleClick}>
      <img src={warningLogo} alt="warning" />
      Don&apos;t click me
    </button>
  );
}
