'use client';

import Image from 'next/image';
import styles from './About.module.css';

export default function About() {
  const personalityBadges = [
    { icon: '💻', label: 'Tech Enthusiast' },
    { icon: '🧠', label: 'Problem Solver' },
    { icon: '👥', label: 'Team Player' }
  ];

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.left}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          
          <p className={styles.bio}>
            I&apos;m a passionate software engineer specializing in full-stack development. I have experience working with modern frontend and backend technologies to build high-quality, scalable web applications.
          </p>

          <p className={styles.bioSecondary}>
            I&apos;m constantly learning and keeping up with the latest tech trends to stay ahead in an ever-evolving industry.
          </p>

          {/* Personality Badges */}
          <div className={styles.badges}>
            {personalityBadges.map((badge, index) => (
              <div key={index} className={styles.badge}>
                <span className={styles.badgeIcon}>{badge.icon}</span>
                <span className={styles.badgeLabel}>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Profile Image with Neon Ring */}
        <div className={styles.right}>
          <div className={styles.imageContainer}>
            <div className={styles.neonRing}></div>
            <div className={styles.imageWrapper}>
              <Image
                src="/kadir.jpg"
                alt="Abdul Kadir Khan"
                fill
                priority
                className={styles.profileImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
