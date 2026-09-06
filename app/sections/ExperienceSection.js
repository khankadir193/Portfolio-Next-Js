import { SectionTitle, ExperienceCardComponent } from '../SectionComponents';
import styles from './ExperienceSection.module.css';
import { experiencesData } from '../data/experiencesData';

export default function ExperienceSection() {
  // Only main experiences
  const mainExp = experiencesData.filter(exp => exp.type !== 'skills');

  return (
    <section id="experience" className={styles.experienceSection}>
      <SectionTitle>Experience</SectionTitle>
      
      {/* Main Experiences */}
      {mainExp.length > 0 && (
        <div className={styles.experienceGroup}>
          <div className={styles.experienceContainer}>
            {mainExp.map((exp) => (
              <div key={`${exp.company}-${exp.period}`} className={styles.experienceItem}>
                <ExperienceCardComponent {...exp} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
