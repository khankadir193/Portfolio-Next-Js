import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroImageWrapper}>
        <div className={`${styles.particle1}`}></div>
        <div className={`${styles.particle2}`}></div>
        <div className={`${styles.particle3}`}></div>
        <Image
          src="/kadir.jpg"
          alt="Kadir Name Hero"
          fill
          className={styles.heroImage}
          priority
        />
      </div>
      <div className={styles.heroOverlay}>
        <h1 className={styles.heroTitle}>Welcome to My Portfolio</h1>
        <p className={styles.heroSubtitle}>Frontend Developer & Designer</p>
      </div>
    </section>
  );
}
