'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const NAV_ITEMS = ["about", "skills", "experience", "project", "education", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollTicking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTicking.current) return;
      scrollTicking.current = true;

      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 100;
        for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
          const section = document.getElementById(NAV_ITEMS[i]);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(NAV_ITEMS[i]);
            break;
          }
        }
        scrollTicking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = useCallback((e, item) => {
    setIsMenuOpen(false);
    setActiveSection(item);

    if (item === 'about') {
      e.preventDefault();
      window.history.replaceState(null, null, window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (item === 'contact') {
      e.preventDefault();
      const section = document.getElementById(item);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'end' });
        window.history.replaceState(null, null, `#${item}`);
      }
      return;
    }

    e.preventDefault();
    const section = document.getElementById(item);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, null, `#${item}`);
    }
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <h1 className="brand">Abdul Kadir Khan</h1>

      <button
        className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        type="button"
      >
        <span className="navbar-toggle-bar"></span>
        <span className="navbar-toggle-bar"></span>
        <span className="navbar-toggle-bar"></span>
      </button>

      <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              className={activeSection === item ? 'active' : ''}
              onClick={(e) => handleNavClick(e, item)}
            >
              {item}
            </a>
          </li>
        ))}
        <li>
          <a
            href="/cv/Kadir-CV.pdf"
            download="Kadir-CV.pdf"
            className="download-resume-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}
