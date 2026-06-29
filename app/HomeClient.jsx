"use client";

import { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import About from './About';

const Navbar = dynamic(() => import('./Navbar'), { ssr: false });
const Footer = dynamic(() => import('./Footer'));

import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

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
        height,
        borderRadius: 4,
        animation: 'wave',
      }}
    />
  </Box>
);

export default function HomeClient() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <div>
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
      </div>

        <Footer />
    </>
  );
}
