'use client';

import { useState, useEffect } from 'react';
import styles from './AmbientBackground.module.css';

// Deterministic pseudo-random function for consistent hydration
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const AmbientBackground = () => {
  const [particles, setParticles] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Generate deterministic particle data only on client side
    const particleData = Array.from({ length: 60 }, (_, i) => {
      const types = ['circle', 'square', 'triangle', 'star'];
      const colors = [
        'rgba(0, 212, 255, 0.8)',
        'rgba(0, 153, 255, 0.6)',
        'rgba(0, 212, 255, 0.7)',
        'rgba(0, 153, 255, 0.5)',
        'rgba(0, 212, 255, 0.6)',
        'rgba(0, 153, 255, 0.7)'
      ];

      let size = 'small';
      if (i % 4 === 0) size = 'medium';
      if (i % 8 === 0) size = 'large';
      if (i % 12 === 0) size = 'xlarge';

      const seed = i * 1000;
      return {
        id: i,
        left: `${seededRandom(seed) * 100}%`,
        top: `${seededRandom(seed + 1) * 100}%`,
        animationDelay: `${seededRandom(seed + 2) * 25}s`,
        animationDuration: `${20 + seededRandom(seed + 3) * 15}s`,
        size,
        type: types[Math.floor(seededRandom(seed + 4) * types.length)],
        color: colors[Math.floor(seededRandom(seed + 5) * colors.length)],
        direction: seededRandom(seed + 6) > 0.5 ? 'up' : 'down',
      };
    });
    setParticles(particleData);

    // Generate sparkle effects
    const sparkleData = Array.from({ length: 30 }, (_, i) => {
      const seed = i * 1000;
      return {
        id: i,
        left: `${seededRandom(seed) * 100}%`,
        top: `${seededRandom(seed + 1) * 100}%`,
        animationDelay: `${seededRandom(seed + 2) * 15}s`,
        size: seededRandom(seed + 3) > 0.7 ? 'large' : 'small',
      };
    });
    setSparkles(sparkleData);

    // Generate geometric shapes
    const shapeData = Array.from({ length: 15 }, (_, i) => {
      const seed = i * 1000;
      return {
        id: i,
        left: `${seededRandom(seed) * 100}%`,
        top: `${seededRandom(seed + 1) * 100}%`,
        animationDelay: `${seededRandom(seed + 2) * 20}s`,
        rotation: `${seededRandom(seed + 3) * 360}deg`,
        type: seededRandom(seed + 4) > 0.5 ? 'hexagon' : 'diamond',
      };
    });
    setShapes(shapeData);
  }, [isClient]);

  return (
    <div className={styles.ambientBackground}>
      {/* Floating particles */}
      <div className={styles.particleContainer}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`${styles.particle} ${styles[particle.size]} ${styles[particle.type]} ${styles[particle.direction]}`}
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
              background: particle.color,
              '--particle-color': particle.color,
            }}
          />
        ))}
      </div>

      {/* Sparkle effects */}
      <div className={styles.sparkleContainer}>
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className={`${styles.sparkle} ${styles[sparkle.size]}`}
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDelay: sparkle.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <div className={styles.shapeContainer}>
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`${styles.shape} ${styles[shape.type]}`}
            style={{
              left: shape.left,
              top: shape.top,
              animationDelay: shape.animationDelay,
              transform: `rotate(${shape.rotation})`,
            }}
          />
        ))}
      </div>

      {/* Enhanced wave container */}
      <div className={styles.waveContainer}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>

      {/* Gradient orbs */}
      <div className={styles.orbContainer}>
        <div className={styles.orb}></div>
        <div className={styles.orb}></div>
        <div className={styles.orb}></div>
        <div className={styles.orb}></div>
      </div>
    </div>
  );
};

export default AmbientBackground;
