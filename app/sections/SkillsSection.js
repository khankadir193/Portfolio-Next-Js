import { Container, Typography, Grid, Box } from '@mui/material';
import { SectionTitle, NeonCard, TechTag } from '../SectionComponents';
import styles from './SkillsSection.module.css';
import { skillsData } from '../data/skillsData';

export default function SkillsSection() {
  const skillCategories = [
    { title: 'Frontend', skills: skillsData.frontend, icon: '🎨' },
    { title: 'Backend', skills: skillsData.backend, icon: '⚙️' },
    { title: 'Software', skills: skillsData.others, icon: '🛠️' }
  ];

  return (
    <Box id="skills" sx={{ mb: 6, py: 4 }}>
      <SectionTitle>Skills</SectionTitle>
      
      <Grid container spacing={3} sx={{ maxWidth: '1000px', margin: '0 auto' }}>
        {skillCategories.map((category, index) => (
          <Grid item xs={12} md={4} key={index}>
            <div className={styles.skillCardContainer}>
              <div className={styles.skillCardIcon}>{category.icon}</div>
              <h3 className={styles.skillCardTitle}>{category.title}</h3>
              
              <div className={styles.skillsList}>
                {category.skills.map((skill, idx) => (
                  <TechTag key={idx} label={skill} variant="outline" />
                ))}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
