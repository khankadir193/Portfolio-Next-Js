'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const navItems = ["about", "skills", "experience", "project", "education", "contact"];
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

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
        {navItems.map((item) => (
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
      </ul>
    </nav>
  );
}