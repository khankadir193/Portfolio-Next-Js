'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const NAV_ITEMS = ["about", "skills", "experience", "project", "education", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollTicking = useRef(false);
  const navRef = useRef(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

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
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = useCallback((e, item) => {
    e.preventDefault();
    closeMenu();
    setActiveSection(item);
    const section = document.getElementById(item);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, null, `#${item}`);
    }
  }, [closeMenu]);

  return (
    <>
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

        <ul
          className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}
          ref={navRef}
        >
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

      <div
        className={`nav-overlay ${isMenuOpen ? 'visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
}
