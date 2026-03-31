import { ExperienceCard } from '../CardComponents';
import { Container, Typography, Grid, Box } from '@mui/material';
import { experiencesData } from '../data/experiencesData';

export default function ExperienceSection() {
  return (
    <Box id="experience" sx={{ mb: 6 }}>
      <Typography variant="h3" component="h2" sx={{ mb: 4, color: 'primary.main', textAlign: 'center' }}>
        Experience
      </Typography>
      <Grid container spacing={3}>
        {experiencesData.map((exp, index) => (
          <Grid item xs={12} key={index}>
            <ExperienceCard {...exp} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}