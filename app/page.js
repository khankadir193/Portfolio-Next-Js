'use client';

import { useState, useEffect } from 'react';
import Hero from './Hero';
import Navbar from './Navbar';
import Footer from './Footer';
import { SkillCard, ExperienceCard, ProjectCard, EducationCard } from './CardComponents';
import { Container, Typography, Grid, Box } from '@mui/material';
import { Code, Storage, Build } from '@mui/icons-material';

export default function Home() {
  const navItems = ["about", "skills", "experience", "project", "education"];

  const skillsData = {
    frontend: ['React Js', 'Vue Js', 'Redux', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Material UI'],
    backend: ['Node Js', 'Hapi Js', 'DynamoDB', 'S3Bucket', 'AWS Services'],
    others: ['Git', 'GitHub', 'Netlify', 'VS Code', 'Postman', 'Figma']
  };

  const experiences = [
    {
      title: 'Software Engineer',
      company: 'FugetronCorp',
      period: 'Jan 2025 - Present',
      description: 'As a Software Engineer at FugetronCorp, I develop and optimize dynamic, scalable, and responsive SPAs using React.js, JavaScript, and AWS Amplify. I build core modules from scratch, enhance UI/UX, and collaborate with cross-functional teams to improve the performance and functionality of application.',
      skills: ['JavaScript', 'React JS', 'Redux', 'HTML/CSS', 'AWS']
    },
    {
      title: 'Web Developer',
      company: 'Melot Group',
      period: 'Oct 2023 - Dec 2024',
      description: 'As a Full-Stack Developer at Melot Group, I specialize in creating responsive and intuitive web applications. My expertise spans across front-end frameworks like Vue.js and React.js, while I utilize Node.js (Express.js), MongoDB Atlas, and AWS services for the backend infrastructure. With a profound understanding of responsive design principles and cross-browser compatibility, I prioritize adhering to industry best practices for code quality, testing, and documentation.',
      skills: ['Vue.js', 'React.js', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      title: 'Frontend Developer',
      company: 'Unifo Pvt Ltd.',
      period: 'Aug 2021 - Sep 2023',
      description: 'As a Frontend Engineer working on a logistics-based application for Flyjac, I implemented features to enhance functionality and improve user experience.',
      skills: ['JavaScript', 'React JS', 'Redux', 'HTML/CSS', 'Material UI', 'Bootstrap']
    }
  ];

  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A responsive personal portfolio website built with Next.js and Material UI, showcasing skills, experience, and projects.',
      technologies: ['Next.js', 'Material UI', 'React', 'CSS'],
      link: '#'
    }
  ];

  const education = [
    {
      degree: 'Master Of Computer Application - MCA',
      institution: 'Vellore Institute Of Technology',
      period: 'July 2019 - May 2022 | Grade: 8.7 CGPA',
      description: 'Completed master\'s degree focused on computer programming and specific applications from VIT Bhopal. Solidified knowledge and honed skills in the field through this academic journey.'
    },
    {
      degree: 'Bachelor Of Computer Application - BCA',
      institution: 'Makhanlal Chaturvedi National University of Journalism & Communication',
      period: 'July 2016 - May 2019 | Grade: 82%',
      description: 'Graduated from Gorakhpur, affiliated with MCRP Bhopal. Gained proficiency in programming languages including Java, C, C++, and PHP.'
    },
    {
      degree: 'Intermediate Science with Math',
      institution: 'Sardar Patel Rajmati Devi Intermediate College',
      period: 'July 2015 - May 2016 | Grade: 79%',
      description: 'Completed class 12th education studying Science with Math.'
    },
    {
      degree: 'High School',
      institution: 'Sardar Patel Rajmati Devi Intermediate College',
      period: 'July 2013 - May 2014 | Grade: 77%',
      description: 'Completed class 10th education studying Science with Math.'
    }
  ];

  return (
    <>
      <Navbar />
      <Hero />
      <div className="page">
        <header className="hero">
          <div className="hero-content" id="about">
          <p className="tagline">Hi, I am</p>
          <h2>Abdul Kadir Khan</h2>
          <p className="role">I am a Software Engineer</p>
          <p>
            I am an enthusiastic and adaptable individual, constantly seeking
            out new opportunities for growth. Fueled by a strong desire to
            expand my knowledge, I am committed to producing top-notch outcomes.
            With an optimistic outlook and a determination to embrace
            challenges, I am poised to make a valuable impact and attain
            remarkable accomplishments.
          </p>
        </div>
      </header>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Skills Section */}
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

        {/* Experience Section */}
        <Box id="experience" sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 4, color: 'primary.main', textAlign: 'center' }}>
            Experience
          </Typography>
          <Grid container spacing={3}>
            {experiences.map((exp, index) => (
              <Grid item xs={12} key={index}>
                <ExperienceCard {...exp} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Projects Section */}
        <Box id="project" sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 4, color: 'primary.main', textAlign: 'center' }}>
            Projects
          </Typography>
          <Grid container spacing={3}>
            {projects.map((proj, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ProjectCard {...proj} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Education Section */}
        <Box id="education" sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 4, color: 'primary.main', textAlign: 'center' }}>
            Education
          </Typography>
          <Grid container spacing={3}>
            {education.map((edu, index) => (
              <Grid item xs={12} md={6} key={index}>
                <EducationCard {...edu} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Footer />
      </div>
    </>
  );
}
