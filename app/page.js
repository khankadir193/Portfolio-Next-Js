'use client';

import { useState, useEffect } from 'react';
import Hero from './Hero';
import Navbar from './Navbar';
import Footer from './Footer';
import { Container } from '@mui/material';

// Import section components

import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import EducationSection from './sections/EducationSection';

export default function Home() {
  const navItems = ["about", "skills", "experience", "project", "education"];

  return (
    <>
      <Navbar />
      <Hero />
      <Container maxWidth="lg" sx={{ py: 4 }}>
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
        </Container>

      <Footer />
    </>
  );
}
