import { EducationCard } from '../CardComponents';
import { Container, Typography, Grid, Box } from '@mui/material';
import { educationData } from '../data/educationData';

export default function EducationSection() {
  return (
    <Box id="education" sx={{ mb: 6 }}>
      <Typography variant="h3" component="h2" sx={{ mb: 4, color: 'primary.main', textAlign: 'center' }}>
        Education
      </Typography>
      <Grid container spacing={3}>
        {educationData.map((edu, index) => (
          <Grid item xs={12} md={6} key={index}>
            <EducationCard {...edu} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}