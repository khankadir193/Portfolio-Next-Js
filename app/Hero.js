 'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [cursorBlink, setCursorBlink] = useState(true);
  const overlayRef = useRef(null);
  const imageWrapperRef = useRef(null);

  const fullText = "Hi, I'm Kadir - Frontend Developer";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);

        // Blink cursor after typing
        const blinkInterval = setInterval(() => {
          setCursorBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(blinkInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!overlayRef.current || !imageWrapperRef.current) return;
    const rect = overlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    overlayRef.current.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    imageWrapperRef.current.style.transform = `translateZ(0) rotateX(${-rotateX * 0.5}deg) rotateY(${-rotateY * 0.5}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
    if (imageWrapperRef.current) imageWrapperRef.current.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroImageWrapper} ref={imageWrapperRef}>
        <div className={`${styles.particle1}`}></div>
        <div className={`${styles.particle2}`}></div>
        <div className={`${styles.particle3}`}></div>
        <div className={`${styles.particle4}`}></div>
        <div className={`${styles.particle5}`}></div>
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
          <span className={`${styles.cursor} ${cursorBlink ? styles.blink : ''}`}>|</span>
        </h1>
        <p className={styles.heroSubtitle}>Crafting stunning digital experiences with React, Next.js & Tailwind</p>
        <div className={styles.heroButtons}>
          <Link href="#projects" className={styles.ctaButtonPrimary}>
            View My Work
          </Link>
          <a href="/Kadir-CV.pdf" download className={styles.ctaButtonSecondary}>
            Download CV
          </a>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollArrow}></div>
      </div>
    </section>
  );
}
