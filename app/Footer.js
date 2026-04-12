'use client';

import { useState, useEffect } from 'react';
import { GitHub, LinkedIn, Email, Phone } from '@mui/icons-material';
import styles from './Footer.module.css';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <h2 className={styles.footerBrand}>Abdul Kadir Khan</h2>
          <p className={styles.footerTitle}>Front End Developer</p>
          <div className={styles.brandGlow}></div>
        </div>

        {/* Navigation Section */}
        <div className={styles.navSection}>
          <h3 className={styles.sectionTitle}>Quick Links</h3>
          <nav className={styles.footerNav}>
            <a href="#about" className={styles.navLink}>About</a>
            <a href="#skills" className={styles.navLink}>Skills</a>
            <a href="#experience" className={styles.navLink}>Experience</a>
            <a href="#projects" className={styles.navLink}>Projects</a>
            <a href="#education" className={styles.navLink}>Education</a>
          </nav>
        </div>

        {/* Contact Section */}
        <div className={styles.contactSection}>
          <h3 className={styles.sectionTitle}>Get In Touch</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Phone className={styles.contactIcon} />
              <span className={styles.contactText}>+91 7081071456</span>
            </div>
            <div className={styles.contactItem}>
              <Email className={styles.contactIcon} />
              <span className={styles.contactText}>abdulkadirk059@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className={styles.socialSection}>
          <h3 className={styles.sectionTitle}>Connect</h3>
          <div className={styles.socialLinks}>
            <a 
              href="https://github.com/khankadir193" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className={styles.socialLink}
            >
              <GitHub />
              <span className={styles.socialText}>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/abdul-kadir-pathan5439/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className={styles.socialLink}
            >
              <LinkedIn />
              <span className={styles.socialText}>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={styles.copyrightSection}>
          <p className={styles.footerCopyright}>
            © {currentYear} Abdul Kadir Khan | All rights reserved
          </p>
          <div className={styles.footerGlow}></div>
        </div>
      </div>
    </footer>
  );
}

