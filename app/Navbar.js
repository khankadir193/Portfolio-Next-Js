'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const navItems = ["about", "skills", "experience", "project", "education"];
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

  return (
    <nav className="navbar">
      <h1 className="brand">Abdul Kadir Khan</h1>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              className={activeSection === item ? 'active' : ''}
              onClick={() => setActiveSection(item)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}