import styles from './SectionComponents.module.css';

// Section Title with Neon styling
export const SectionTitle = ({ children }) => (
  <h2 className={styles.sectionTitle}>
    {children}
  </h2>
);

// Tech Tag/Badge for skills
export const TechTag = ({ label, variant = 'outline' }) => (
  <span className={`${styles.techTag} ${styles[variant]}`}>
    {label}
  </span>
);

// Neon Card Wrapper
export const NeonCard = ({ children, className = '' }) => (
  <div className={`${styles.neonCard} ${className}`}>
    {children}
  </div>
);

// Experience Card with Icon
export const ExperienceCardComponent = ({ 
  title, 
  company, 
  period, 
  description, 
  skills,
  icon = '💼'
}) => (
  <NeonCard>
    <div className={styles.cardHeader}>
      <div className={styles.cardHeaderLeft}>
        <span className={styles.cardIcon}>{icon}</span>
        <div>
          <h4 className={styles.cardTitle}>{title}</h4>
          <p className={styles.cardSubtitle}>{company}</p>
        </div>
      </div>
      <span className={styles.cardPeriod}>{period}</span>
    </div>
    <p className={styles.cardDescription}>{description}</p>
    <div className={styles.skillsList}>
      {skills.map((skill, idx) => (
        <TechTag key={idx} label={skill} variant="filled" />
      ))}
    </div>
  </NeonCard>
);

// Project Card
export const ProjectCardComponent = ({ 
  title, 
  description, 
  technologies, 
  link,
  icon = '📁'
}) => (
  <NeonCard>
    <div className={styles.projectHeader}>
      <span className={styles.projectIcon}>{icon}</span>
      <h4 className={styles.projectTitle}>{title}</h4>
    </div>
    <p className={styles.projectDescription}>{description}</p>
    <div className={styles.skillsList}>
      {technologies.map((tech, idx) => (
        <TechTag key={idx} label={tech} variant="outline" />
      ))}
    </div>
    {link && link !== '#' && (
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
        View Project →
      </a>
    )}
  </NeonCard>
);

export default {
  SectionTitle,
  TechTag,
  NeonCard,
  ExperienceCardComponent,
  ProjectCardComponent
};
