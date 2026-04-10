'use client';

import { Box } from '@mui/material';
import { SectionTitle, NeonCard } from '../SectionComponents';
import styles from './EducationSection.module.css';
import { educationData } from '../data/educationData';

export default function EducationSection() {
  return (
    <Box id="education" sx={{ mb: 6, py: 4 }}>
      <SectionTitle>Education</SectionTitle>
      
      <div className={styles.educationContainer}>
        {educationData.map((edu, index) => (
          <NeonCard key={index} className={styles.educationCard}>
            <div className={styles.educationHeader}>
              <div className={styles.educationIcon}>🎓</div>
              <div className={styles.educationInfo}>
                <h4 className={styles.degree}>{edu.degree}</h4>
                <p className={styles.institution}>{edu.institution}</p>
              </div>
              <span className={styles.period}>{edu.period}</span>
            </div>
            <p className={styles.description}>{edu.description}</p>
          </NeonCard>
        ))}
      </div>
    </Box>
  );
}
