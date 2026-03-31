import { SkillCard } from '../CardComponents';
import { Container, Typography, Grid, Box } from '@mui/material';
import { Code, Storage, Build } from '@mui/icons-material';
import { skillsData } from '../data/skillsData';

export default function SkillsSection() {
  return (
    <Box id="skills" sx={{ mb: 6 }}>
      <Typography variant="h3" component="h2" sx={{ mb: 4, color: 'primary.main', textAlign: 'center' }}>
        Skills
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SkillCard title="Frontend" skills={skillsData.frontend} icon={<Code />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SkillCard title="Backend" skills={skillsData.backend} icon={<Storage />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SkillCard title="Others" skills={skillsData.others} icon={<Build />} />
        </Grid>
      </Grid>
    </Box>
  );
}