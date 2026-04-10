import { Container, Typography, Grid, Box } from '@mui/material';
import { SectionTitle, ExperienceCardComponent } from '../SectionComponents';
import styles from './ExperienceSection.module.css';
import { experiencesData } from '../data/experiencesData';

export default function ExperienceSection() {
  // Group experiences by type - Skills group first, then main experiences
  const skillsExp = experiencesData.filter(exp => exp.type === 'skills');
  const mainExp = experiencesData.filter(exp => exp.type !== 'skills');

  return (
    <Box id="experience" sx={{ mb: 6, py: 4 }}>
      <SectionTitle>Experience</SectionTitle>
      
      {/* Skills Group */}
      {skillsExp.length > 0 && (
        <div className={styles.experienceGroup}>
          <h3 className={styles.groupTitle}>Experience</h3>
          <div className={styles.experienceContainer}>
            {skillsExp.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <ExperienceCardComponent {...exp} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Experiences Group */}
      {mainExp.length > 0 && (
        <div className={styles.experienceGroup}>
          <h3 className={styles.groupTitle}>Experience</h3>
          <div className={styles.experienceContainer}>
            {mainExp.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <ExperienceCardComponent {...exp} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Box>
  );
}
