'use client';

import { useState, useEffect } from 'react';
import About from './About';
import Navbar from './Navbar';
import Footer from './Footer';
import { Container, Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';

// Lazy-loaded section components
const LazySkillsSection = dynamic(() => import('./sections/SkillsSection'), { 
  loading: () => <Skeleton variant="rectangular" sx={{ height: 400, borderRadius: 4 }} />, 
  ssr: false 
});
const LazyExperienceSection = dynamic(() => import('./sections/ExperienceSection'), { 
  loading: () => <Skeleton variant="rectangular" sx={{ height: 400, borderRadius: 4 }} />, 
  ssr: false 
});
const LazyProjectsSection = dynamic(() => import('./sections/ProjectsSection'), { 
  loading: () => <Skeleton variant="rectangular" sx={{ height: 600, borderRadius: 4 }} />, 
  ssr: false 
});
const LazyEducationSection = dynamic(() => import('./sections/EducationSection'), { 
  loading: () => <Skeleton variant="rectangular" sx={{ height: 400, borderRadius: 4 }} />, 
  ssr: false 
});
const LazyContactSection = dynamic(() => import('./sections/ContactSection'), { 
  loading: () => <Skeleton variant="rectangular" sx={{ height: 500, borderRadius: 4 }} />, 
  ssr: false 
});

export default function Home() {
  const navItems = ["about", "skills", "experience", "project", "education", "contact"];

  return (
    <>
      <Navbar />
      <About />
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
          <LazySkillsSection />
          <LazyExperienceSection />
          <LazyProjectsSection />
          <LazyEducationSection />
          <LazyContactSection />
        </Container>

      <Footer />
    </>
  );
}

