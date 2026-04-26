'use client';

import { Suspense, lazy } from 'react';
import About from './About';
import Navbar from './Navbar';
import Footer from './Footer';
import { Container, Skeleton, Box } from '@mui/material';

// Lazy-loaded section components with optimized loading
const LazySkillsSection = lazy(() => import('./sections/SkillsSection'));
const LazyExperienceSection = lazy(() => import('./sections/ExperienceSection'));
const LazyProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const LazyEducationSection = lazy(() => import('./sections/EducationSection'));
const LazyContactSection = lazy(() => import('./sections/ContactSection'));

// Optimized loading skeleton component
const LoadingSkeleton = ({ height = 400 }) => (
  <Box sx={{ py: 2 }}>
    <Skeleton 
      variant="rectangular" 
      sx={{ 
        height: height, 
        borderRadius: 4,
        animation: 'wave',
      }} 
    />
  </Box>
);

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <About />
        <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
          <section aria-labelledby="skills-heading">
            <Suspense fallback={<LoadingSkeleton height={400} />}>
              <LazySkillsSection />
            </Suspense>
          </section>
          
          <section aria-labelledby="experience-heading">
            <Suspense fallback={<LoadingSkeleton height={400} />}>
              <LazyExperienceSection />
            </Suspense>
          </section>
          
          <section aria-labelledby="projects-heading">
            <Suspense fallback={<LoadingSkeleton height={600} />}>
              <LazyProjectsSection />
            </Suspense>
          </section>
          
          <section aria-labelledby="education-heading">
            <Suspense fallback={<LoadingSkeleton height={400} />}>
              <LazyEducationSection />
            </Suspense>
          </section>
          
          <section aria-labelledby="contact-heading">
            <Suspense fallback={<LoadingSkeleton height={500} />}>
              <LazyContactSection />
            </Suspense>
          </section>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

