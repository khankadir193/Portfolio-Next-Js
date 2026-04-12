'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const sectionRef = useRef(null);

  const fullText = "Hi, I'm Kadir - Frontend Engineer";

  // Clean typing effect with proper cursor control
  useEffect(() => {
    let index = 0;
    let typingInterval;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 70);
    };

    startTyping();

    return () => {
      if (typingInterval) clearInterval(typingInterval);
    };
  }, []);

  // Subtle 3D tilt (parent only)
  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 40;
    const rotateY = (rect.width / 2 - x) / 40;

    sectionRef.current.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const resetTilt = () => {
    if (sectionRef.current) {
      sectionRef.current.style.transform = 'rotateX(0) rotateY(0)';
    }
  };

  // Clean button handlers with proper event handling
  const handleViewProjects = () => {
    const projectSection = document.getElementById('project');
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv/Kadir-CV.pdf';
    link.download = 'Kadir-CV.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="about"
      className={styles.hero}
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div className={styles.left}>
        <h1 className={styles.title}>
          {typedText}
          <span 
            className={`${styles.cursor} ${!isTyping ? styles.blink : ''}`}
          >
            |
          </span>
        </h1>

        <p className={styles.subtitle}>
          I build scalable, high-performance web applications using
          React, Next.js and modern frontend architecture.
        </p>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={handleViewProjects}
            className={styles.primaryBtn}
          >
            View Projects
          </button>

          <button
            type="button"
            onClick={handleDownloadCV}
            className={styles.secondaryBtn}
          >
            Download CV
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.imageWrapper}>
          <Image
            src="/kadir.jpg"
            alt="Kadir - Frontend Engineer"
            fill
            priority
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}