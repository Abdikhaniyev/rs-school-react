import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from '@/styles/404.module.scss';

export default function Custom404() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Image src="/404.webp" alt="404" width={500} height={488.562} priority />
      <h1>The page you are looking for does not exist. Please go back to the home page.</h1>
      <button onClick={() => router.push('/')}>Back home</button>
    </div>
  );
}
