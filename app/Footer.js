'use client';

import { useState, useEffect } from 'react';
import { GitHub, LinkedIn } from '@mui/icons-material';
import styles from './Footer.module.css';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h2 className={styles.footerBrand}>John Doe</h2>
        <p className={styles.footerTitle}>Full-Stack Software Engineer</p>
        
        <div className={styles.socialLinks}>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub"
            className={styles.socialLink}
          >
            <GitHub />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            className={styles.socialLink}
          >
            <LinkedIn />
          </a>
        </div>

        <p className={styles.footerCopyright}>
          © {currentYear} John Doe | All rights reserved
        </p>
      </div>
    </footer>
  );
}

