'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { lockScroll, unlockScroll } from './utils/scrollLock';

const NAV_ITEMS = ["about", "skills", "experience", "project", "education", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Use IntersectionObserver instead of scroll listener + offsetTop reads.
  // This eliminates per-scroll forced layout and moves section tracking
  // entirely off the main thread critical path.
  useEffect(() => {
    // rootMargin: top -80px to account for fixed navbar height,
    // bottom -50% so section activates when its top 50% enters view.
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible entry (highest up the page)
        let topmost = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!topmost || entry.boundingClientRect.top < topmost.boundingClientRect.top) {
              topmost = entry;
            }
          }
        }
        if (topmost) {
          setActiveSection(topmost.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0,
      }
    );

    const sections = NAV_ITEMS.map((id) => document.getElementById(id)).filter(Boolean);
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Scroll lock — ref-counted so it cooperates with modals (Issue 10).
  useEffect(() => {
    if (isMenuOpen) {
      lockScroll();
      return () => unlockScroll();
    }
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
