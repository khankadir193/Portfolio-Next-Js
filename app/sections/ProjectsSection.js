import { Grid, Box } from '@mui/material';
import { SectionTitle, ProjectCardComponent } from '../SectionComponents';
import styles from './ProjectsSection.module.css';
import { projectsData } from '../data/projectsData';

export default function ProjectsSection() {
  return (
    <Box id="project" sx={{ mb: 6, py: 4 }}>
      <SectionTitle>Projects</SectionTitle>
      
      <Grid container spacing={3} sx={{ maxWidth: '1000px', margin: '0 auto' }}>
        {projectsData.map((proj, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <ProjectCardComponent {...proj} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
