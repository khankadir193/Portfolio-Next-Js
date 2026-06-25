'use client';

import { useState, useEffect, useRef } from 'react';

const NAV_ITEMS = ["about", "skills", "experience", "project", "education", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
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

  const handleNavClick = (e, item) => {
    setActiveSection(item);
    
    // Special handling for "about" - prevent hash and scroll to top
    if (item === 'about') {
      e.preventDefault(); // Prevent URL hash only for about
      window.history.replaceState(null, null, window.location.pathname); // Clear hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Special handling for "contact" - scroll to bottom
    if (item === 'contact') {
      e.preventDefault(); // Prevent default anchor jump
      const section = document.getElementById(item);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'end' });
        // Update URL with hash after smooth scroll starts
        window.history.replaceState(null, null, `#${item}`);
      }
      return;
    }
    
    // For other sections - prevent default and use smooth scrolling
    e.preventDefault(); // Prevent default anchor jump
    const section = document.getElementById(item);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      // Update URL with hash after smooth scroll starts
      window.history.replaceState(null, null, `#${item}`);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="brand">Abdul Kadir Khan</h1>
      <ul className="nav-links">
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