'use client';

import React, { useState, useEffect } from 'react';
import styles from './BackgroundName.module.css';

const BackgroundName = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    // Generate multiple instances of the name with different properties
    const nameInstances = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      text: "ABDUL KADIR KHAN",
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.3 + Math.random() * 0.4, // 0.3 to 0.7 scale
      opacity: 0.03 + Math.random() * 0.05, // Very subtle opacity
      animationDelay: Math.random() * 10,
      animationDuration: 20 + Math.random() * 20,
      color: ['#38bdf8', '#06b6d4', '#8b5cf6', '#ec4899', '#10b981'][Math.floor(Math.random() * 5)],
    }));
    setNames(nameInstances);
  }, []);

  return (
    <div className={styles.backgroundNameContainer}>
      {names.map((name) => (
        <div
          key={name.id}
          className={styles.floatingName}
          style={{
            left: `${name.x}%`,
            top: `${name.y}%`,
            transform: `rotate(${name.rotation}deg) scale(${name.scale})`,
            opacity: name.opacity,
            animationDelay: `${name.animationDelay}s`,
            animationDuration: `${name.animationDuration}s`,
            color: name.color,
          }}
        >
          {name.text}
        </div>
      ))}

      {/* Large central name with special effects */}
      <div className={styles.centralName}>
        <div className={styles.nameGlow}>ABDUL KADIR KHAN</div>
        <div className={styles.nameGlow}>ABDUL KADIR KHAN</div>
        <div className={styles.nameGlow}>ABDUL KADIR KHAN</div>
      </div>

      {/* Scattered letters effect */}
      <div className={styles.scatteredLetters}>
        {"ABDUL KADIR KHAN".split('').map((letter, index) => (
          <span
            key={index}
            className={styles.scatteredLetter}
            style={{
              animationDelay: `${index * 0.5}s`,
              left: `${10 + (index * 8)}%`,
              top: `${20 + (Math.sin(index) * 10)}%`,
            }}
          >
            {letter === ' ' ? '' : letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BackgroundName;