'use client';

import { useState, useEffect } from 'react';
import { LinkedIn, Instagram, Facebook, Twitter, Phone, Email } from '@mui/icons-material';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024); // Default year
  const navItems = ["about", "skills", "experience", "project", "education"];

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-brand">Abdul Kadir Khan</h2>
        <ul className="footer-nav">
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</a>
            </li>
          ))}
        </ul>
        <div className="social-media">
          <a href="https://linkedin.com/in/abdulkadirkhan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedIn />
          </a>
          <a href="https://instagram.com/abdulkadirkhan" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram />
          </a>
          <a href="https://facebook.com/abdulkadirkhan" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook />
          </a>
          <a href="https://twitter.com/abdulkadirkhan" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <Twitter />
          </a>
        </div>

        <div className="contact-info">
          <p><Phone /> +91 7081071456</p>
          <p><Email /> abdulkadirk059@gmail.com</p>
        </div>
        <p className="footer-copyright">© {currentYear} Abdul Kadir Khan. All rights reserved.</p>
      </div>
    </footer>
  );
}

