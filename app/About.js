import Image from 'next/image';
import PersonalityBadges from './components/PersonalityBadges';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.left}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          
          <p className={styles.bio}>
            Frontend Developer with 4+ years of experience building scalable and user-friendly web applications using React.js, JavaScript, and Redux Toolkit. Experienced in developing responsive interfaces, integrating REST APIs, and optimizing application performance.
          </p>

          <p className={styles.bioSecondary}>
            Currently expanding expertise in TypeScript and Next.js to build modern, high-performance web applications and deliver exceptional user experiences.
          </p>

          {/* Personality Badges */}
          <PersonalityBadges />
        </div>

        {/* Right Section - Profile Image with Neon Ring */}
        <div className={styles.right}>
          <div className={styles.imageContainer}>
            <div className={styles.neonRing}></div>
            <div className={styles.imageWrapper}>
              <Image
                src="/kadir.jpeg"
                alt="Abdul Kadir Khan"
                fill
                className={styles.profileImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
