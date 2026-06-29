import { Grid, Box } from '@mui/material';
import { SectionTitle } from '../SectionComponents';
import ProjectCardWithModal from '../components/ProjectCardWithModal';
import styles from './ProjectsSection.module.css';
import { projectsData } from '../data/projectsData';

export default function ProjectsSection() {
  return (
    <Box id="project" sx={{ mb: 4, py: 2 }}>
      <SectionTitle>Projects</SectionTitle>
      
      <Grid container spacing={3} sx={{ maxWidth: '1000px', margin: '0 auto' }}>
        {projectsData.map((proj, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <ProjectCardWithModal project={proj} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
