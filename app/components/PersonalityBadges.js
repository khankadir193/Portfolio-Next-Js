import styles from './PersonalityBadges.module.css';

export default function PersonalityBadges() {
  const badges = [
    { icon: '💻', label: 'Tech Enthusiast' },
    { icon: '🎯', label: 'Problem Solver' },
    { icon: '👥', label: 'Team Player' }
  ];

  return (
    <div className={styles.badgesContainer}>
      {badges.map((badge, index) => (
        <div key={index} className={styles.badge}>
          <span className={styles.icon}>{badge.icon}</span>
          <span className={styles.label}>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
