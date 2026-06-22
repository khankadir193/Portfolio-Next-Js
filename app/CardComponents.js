'use client';

import { memo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import Work from '@mui/icons-material/Work';
import School from '@mui/icons-material/School';

const cardSx = {
  minHeight: '280px', height: '100%',
  background: 'linear-gradient(135deg, rgba(17,24,39,0.95), rgba(31,41,55,0.95))',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(56,189,248,0.3)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
  position: 'relative', overflow: 'hidden',
  '&::before': {
    content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
    background: 'linear-gradient(90deg, #38bdf8, #06b6d4, #38bdf8)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 3s ease-in-out infinite',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 25px 50px rgba(56,189,248,0.25)',
    borderColor: 'rgba(56,189,248,0.6)',
    '&::before': { animation: 'shimmer 1.5s ease-in-out infinite' },
  },
};

const avatarSx = {
  bgcolor: 'linear-gradient(135deg, #38bdf8, #06b6d4)',
  mr: 2.5, width: 48, height: 48,
  boxShadow: '0 4px 14px rgba(56,189,248,0.4)',
  transition: 'transform 0.3s ease',
};

const gradientTextSx = {
  color: '#38bdf8', fontWeight: '700', fontSize: '1.5rem',
  background: 'linear-gradient(135deg, #38bdf8, #06b6d4)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  backgroundClip: 'text', textAlign: 'center',
};

const SkillCardComp = ({ title, skills, icon }) => (
  <Card sx={cardSx}>
    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar sx={avatarSx}>{icon}</Avatar>
        <Typography variant="h5" component="h3" sx={{ ...gradientTextSx, mb: 2 }}>{title}</Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={1.5} sx={{ flexGrow: 1, justifyContent: 'center' }}>
        {skills.map((skill, index) => (
          <Chip key={index} label={skill} variant="outlined" sx={{
            color: '#e2e8f0', borderColor: 'rgba(56,189,248,0.4)', borderRadius: '20px',
            fontWeight: '500', fontSize: '0.85rem', transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(56,189,248,0.15)', borderColor: '#38bdf8', color: '#38bdf8',
              transform: 'translateY(-2px) scale(1.05)', boxShadow: '0 4px 8px rgba(56,189,248,0.2)',
            },
          }} />
        ))}
      </Box>
    </CardContent>
  </Card>
);

const ExperienceCardComp = ({ title, company, period, description, skills }) => (
  <Card sx={{ ...cardSx, minHeight: '320px', '&:hover': { ...cardSx['&:hover'], transform: 'translateY(-12px) scale(1.01)' } }}>
    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar sx={avatarSx}><Work /></Avatar>
        <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
          <Typography variant="h5" component="h4" sx={{ ...gradientTextSx, mb: 1 }}>{title}</Typography>
          <Typography variant="subtitle1" sx={{ color: '#94a3b8', fontSize: '1.1rem', fontWeight: '500', textAlign: 'center' }}>
            {company} • {period}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: '#e2e8f0', flexGrow: 1, textAlign: 'left' }}>
        {description}
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1.5} justifyContent="center">
        {skills.map((skill, index) => (
          <Chip key={index} label={skill} size="small" sx={{
            bgcolor: 'rgba(56,189,248,0.15)', color: '#38bdf8', borderRadius: '16px',
            fontWeight: '500', fontSize: '0.8rem', border: '1px solid rgba(56,189,248,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: '#38bdf8', color: 'white', transform: 'translateY(-2px) scale(1.05)',
              boxShadow: '0 4px 8px rgba(56,189,248,0.3)',
            },
          }} />
        ))}
      </Box>
    </CardContent>
  </Card>
);

export const ExperienceCard = memo(ExperienceCardComp);

const ProjectCardComp = ({ title, description, technologies, link }) => (
  <Card sx={cardSx}>
    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
      <Typography variant="h5" component="h4" sx={{ ...gradientTextSx, mb: 2.5 }}>{title}</Typography>
      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: '#e2e8f0', flexGrow: 1, textAlign: 'center' }}>
        {description}
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1.5} mb={3} justifyContent="center">
        {technologies.map((tech, index) => (
          <Chip key={index} label={tech} size="small" variant="outlined" sx={{
            color: '#94a3b8', borderColor: 'rgba(56,189,248,0.4)', borderRadius: '16px',
            fontWeight: '500', fontSize: '0.8rem', transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(56,189,248,0.15)', borderColor: '#38bdf8', color: '#38bdf8',
              transform: 'translateY(-2px) scale(1.05)', boxShadow: '0 4px 8px rgba(56,189,248,0.2)',
            },
          }} />
        ))}
      </Box>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" sx={{
            color: '#38bdf8', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer',
            transition: 'all 0.3s ease', textAlign: 'center',
            '&:hover': { color: '#06b6d4', textDecoration: 'underline' },
          }}>
            View Project →
          </Typography>
        </a>
      )}
    </CardContent>
  </Card>
);

export const ProjectCard = memo(ProjectCardComp);

const EducationCardComp = ({ degree, institution, period, description }) => (
  <Card sx={cardSx}>
    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar sx={{ ...avatarSx, mr: 3 }}><School /></Avatar>
        <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
          <Typography variant="h5" component="h4" sx={{ ...gradientTextSx, fontSize: '1.4rem', lineHeight: 1.3 }}>{degree}</Typography>
          <Typography variant="subtitle1" sx={{ color: '#94a3b8', fontSize: '1rem', fontWeight: '500', textAlign: 'center' }}>
            {institution}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: '#64748b', mb: 2.5, fontSize: '0.9rem', fontWeight: '500', textAlign: 'center' }}>
        {period}
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.7, color: '#e2e8f0', flexGrow: 1, textAlign: 'center' }}>
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export const EducationCard = memo(EducationCardComp);
