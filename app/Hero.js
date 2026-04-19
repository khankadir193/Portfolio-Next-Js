'use client';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [cursorBlink, setCursorBlink] = useState(true);
  const sectionRef = useRef(null);
  const animationFrameRef = useRef(null);

  const fullText = useMemo(() => "Hi, I'm Kadir - Frontend Engineer", []);

  useEffect(() => {
    let index = 0;
    let typingInterval;
    let cursorInterval;

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

    const startCursorBlink = () => {
      cursorInterval = setInterval(() => {
        setCursorBlink(prev => !prev);
      }, 500);
    };

    startTyping();
    startCursorBlink();

    return () => {
      if (typingInterval) clearInterval(typingInterval);
      if (cursorInterval) clearInterval(cursorInterval);
    };
  }, [fullText]);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;

    // Use requestAnimationFrame for smoother animations
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y - rect.height / 2) / 40;
      const rotateY = (rect.width / 2 - x) / 40;

      // Use transform instead of changing layout properties
      sectionRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }, []);

  const resetTilt = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (sectionRef.current) {
      sectionRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }
  }, []);

  const handleViewProjects = useCallback(() => {
    const projectSection = document.getElementById('project');
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleDownloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/cv/Kadir-CV.pdf';
    link.download = 'Kadir-CV.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <section
      id="about"
      className={styles.hero}
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      role="banner"
    >
      <div className={styles.left}>
        <h1 className={styles.title}>
          {typedText}
          <span
            className={`${styles.cursor} ${!isTyping ? styles.blink : ''}`}
            aria-hidden="true"
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
            aria-label="View my projects"
          >
            View Projects
          </button>
          <button
            type="button"
            onClick={handleDownloadCV}
            className={styles.secondaryBtn}
            aria-label="Download my CV"
          >
            Download CV
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imageWrapper}>
          <Image
            src="/kadir.jpg"
            alt="Abdul Kadir Khan - Frontend Engineer"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}