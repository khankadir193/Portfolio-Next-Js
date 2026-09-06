import { SectionTitle, TechTag } from '../SectionComponents';
import styles from './EducationSection.module.css';
import { educationData } from '../data/educationData';

export default function EducationSection() {
  return (
    <section id="education" className={styles.educationSection}>
      <SectionTitle>Education</SectionTitle>
      
      <div className={styles.educationContainer}>
        {educationData.map((edu) => (
          <div key={`${edu.institution}-${edu.period}`} className={styles.educationItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.educationCard}>
              <div className={styles.educationHeader}>
                <div className={styles.iconWrapper}>
                  <div className={styles.educationIcon}>🎓</div>
                </div>
                <div className={styles.headerContent}>
                  <div className={styles.titleSection}>
                    <div>
                      <h4 className={styles.degree}>{edu.degree}</h4>
                      <p className={styles.institution}>{edu.institution}</p>
                    </div>
                    <span className={styles.period}>{edu.period}</span>
                  </div>
                  {edu.cgpa && (
                    <p className={styles.cgpaText}>{edu.cgpa}</p>
                  )}
                </div>
              </div>
              
              {edu.description && (
                <p className={styles.description}>{edu.description}</p>
              )}
              
              {edu.skills && edu.skills.length > 0 && (
                <div className={styles.skillsList}>
                  {edu.skills.map((skill) => (
                    <TechTag key={skill} label={skill} variant="outline" />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
