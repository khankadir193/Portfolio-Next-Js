'use client';

import { useState, useEffect } from 'react';
import styles from './BackgroundName.module.css';

// Deterministic pseudo-random function for consistent hydration
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const BackgroundName = () => {
  const [names, setNames] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Generate multiple instances of the name with deterministic properties
    const nameInstances = Array.from({ length: 12 }, (_, i) => {
      const seed = i * 1000;
      return {
        id: i,
        text: "ABDUL KADIR KHAN",
        x: seededRandom(seed) * 100,
        y: seededRandom(seed + 1) * 100,
        rotation: seededRandom(seed + 2) * 360,
        scale: 0.3 + seededRandom(seed + 3) * 0.4, // 0.3 to 0.7 scale
        opacity: 0.03 + seededRandom(seed + 4) * 0.05, // Very subtle opacity
        animationDelay: seededRandom(seed + 5) * 10,
        animationDuration: 20 + seededRandom(seed + 6) * 20,
        color: ['#00d4ff', '#00d4ff', '#0099ff', '#00d4ff', '#0099ff'][Math.floor(seededRandom(seed + 7) * 5)],
      };
    });
    setNames(nameInstances);
  }, [isClient]);

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
