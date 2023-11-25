import { useState } from 'react';
import Image from 'next/image';

import styles from '@/styles/BugButton.module.scss';

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
      <Image src="/warning.svg" width={20} height={20} alt="warning" />
      Don&apos;t click me
    </button>
  );
}
