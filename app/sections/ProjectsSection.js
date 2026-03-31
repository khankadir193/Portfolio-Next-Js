import { ProjectCard } from '../CardComponents';
import { Container, Typography, Grid, Box } from '@mui/material';
import { projectsData } from '../data/projectsData';

export default function ProjectsSection() {
  return (
    <Box id="project" sx={{ mb: 6 }}>
      <Typography variant="h3" component="h2" sx={{ mb: 4, color: 'primary.main', textAlign: 'center' }}>
        Projects
      </Typography>
      <Grid container spacing={3}>
        {projectsData.map((proj, index) => (
          <Grid item xs={12} md={6} key={index}>
            <ProjectCard {...proj} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}