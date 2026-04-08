'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [cursorBlink, setCursorBlink] = useState(true);
  const overlayRef = useRef(null);
  const imageWrapperRef = useRef(null);

  const fullText = "Hi, I'm Kadir - Frontend Developer";

  // ✅ Typing Effect + Proper Cleanup
  useEffect(() => {
    let index = 0;
    let blinkInterval;

    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);

        blinkInterval = setInterval(() => {
          setCursorBlink((prev) => !prev);
        }, 500);
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
      if (blinkInterval) clearInterval(blinkInterval);
    };
  }, []);

  // Smooth Scroll
  const handleScroll = (e) => {
    console.log('Scroll button clicked');
    e.preventDefault();
    const section = document.getElementById('project');
    if (section) {
      console.log('Found project section, scrolling...');
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('Project section not found');
      // Fallback: try to find any section with project in the name
      const projectSection = document.querySelector('[id*="project"], [class*="project"]');
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log('No project section found, scrolling to bottom');
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }
  };

  // CV Download Functionality
  const handleCVClick = (e) => {
    console.log('CV download button clicked');
    e.preventDefault();
    
    // Track click for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download_cv', {
        event_category: 'engagement',
        event_label: 'Hero Section CV',
      });
    }
    
    try {
      // Create download link
      const link = document.createElement('a');
      link.href = '/cv/Kadir-CV.pdf';
      link.download = 'Kadir-CV.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Add event listeners for debugging
      link.onload = () => console.log('CV file loaded successfully');
      link.onerror = (error) => console.error('Error loading CV file:', error);
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('CV download initiated');
    } catch (error) {
      console.error('Error downloading CV:', error);
      // Fallback: open in new tab
      window.open('/cv/Kadir-CV.pdf', '_blank');
    }
  };

  // 3D Mouse Effect
  const handleMouseMove = useCallback((e) => {
    if (!overlayRef.current || !imageWrapperRef.current) return;

    const rect = overlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    overlayRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    imageWrapperRef.current.style.transform = `rotateX(${-rotateX * 0.5}deg) rotateY(${-rotateY * 0.5}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (overlayRef.current)
      overlayRef.current.style.transform = 'rotateX(0) rotateY(0)';
    if (imageWrapperRef.current)
      imageWrapperRef.current.style.transform = 'rotateX(0) rotateY(0)';
  }, []);

  return (
    <section id="about" className={styles.heroSection}>
      <div className={styles.heroImageWrapper} ref={imageWrapperRef}>
        <Image
          src="/kadir.jpg"
          alt="Kadir - Frontend Developer"
          fill
          className={styles.heroImage}
          priority
        />
      </div>

      <div
        className={styles.heroOverlay}
        ref={overlayRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <h1 className={styles.heroTitle}>
          {typedText}
          <span
            className={`${styles.cursor} ${
              cursorBlink ? styles.blink : ''
            }`}
          >
            |
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          Crafting stunning digital experiences with React, Next.js & Tailwind
        </p>

        <div className={styles.heroButtons}>
          {/* Smooth Scroll Button */}
          <button
            onClick={handleScroll}
            className={styles.ctaButtonPrimary}
            style={{ cursor: 'pointer' }}
          >
            View My Work
          </button>

          {/* Download CV Button */}
          <button
            onClick={handleCVClick}
            className={styles.ctaButtonSecondary}
            aria-label="Download CV"
            style={{ cursor: 'pointer' }}
          >
            Download CV
          </button>
        </div>
      </div>
    </section>
  );
}