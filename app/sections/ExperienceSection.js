import { Container, Typography, Grid, Box } from '@mui/material';
import { SectionTitle, ExperienceCardComponent } from '../SectionComponents';
import styles from './ExperienceSection.module.css';
import { experiencesData } from '../data/experiencesData';

export default function ExperienceSection() {
  return (
    <Box id="experience" sx={{ mb: 6, py: 4 }}>
      <SectionTitle>Experience</SectionTitle>
      
      <div className={styles.experienceContainer}>
        {experiencesData.map((exp, index) => (
          <div key={index} className={styles.experienceItem}>
            <ExperienceCardComponent {...exp} />
          </div>
        ))}
      </div>
    </Box>
  );
}
