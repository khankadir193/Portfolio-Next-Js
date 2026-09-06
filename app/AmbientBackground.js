'use client';

import { useState, useEffect } from 'react';
import styles from './AmbientBackground.module.css';

// Deterministic pseudo-random function for consistent output
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate data once, outside the component, as module-level constants.
// These are deterministic (seeded) so they produce the same values every run.
// Reduced counts: 60→25 particles, 30→12 sparkles, 15→8 shapes.
const PARTICLE_TYPES = ['circle', 'square', 'triangle', 'star'];
const PARTICLE_COLORS = [
  'rgba(0, 212, 255, 0.8)',
  'rgba(0, 153, 255, 0.6)',
  'rgba(0, 212, 255, 0.7)',
  'rgba(0, 153, 255, 0.5)',
  'rgba(0, 212, 255, 0.6)',
  'rgba(0, 153, 255, 0.7)',
];

function buildParticles() {
  return Array.from({ length: 25 }, (_, i) => {
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
      type: PARTICLE_TYPES[Math.floor(seededRandom(seed + 4) * PARTICLE_TYPES.length)],
      color: PARTICLE_COLORS[Math.floor(seededRandom(seed + 5) * PARTICLE_COLORS.length)],
      direction: seededRandom(seed + 6) > 0.5 ? 'up' : 'down',
    };
  });
}

function buildSparkles() {
  return Array.from({ length: 12 }, (_, i) => {
    const seed = i * 1000;
    return {
      id: i,
      left: `${seededRandom(seed) * 100}%`,
      top: `${seededRandom(seed + 1) * 100}%`,
      animationDelay: `${seededRandom(seed + 2) * 15}s`,
      size: seededRandom(seed + 3) > 0.7 ? 'large' : 'small',
    };
  });
}

function buildShapes() {
  return Array.from({ length: 8 }, (_, i) => {
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
}

const AmbientBackground = () => {
  // Issue 5: Remove isClient antipattern.
  // This component is already "use client" and loaded with ssr:false via
  // BackgroundComponents.jsx — so we can safely initialise state with data
  // directly. We use lazy useState initializers so the arrays are only built
  // once on mount, not on every render.
  const [particles] = useState(buildParticles);
  const [sparkles] = useState(buildSparkles);
  const [shapes] = useState(buildShapes);

  return (
    <div className={styles.ambientBackground}>
      {/* Floating particles — reduced from 60 to 25 */}
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

      {/* Sparkle effects — reduced from 30 to 12 */}
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

      {/* Geometric shapes — reduced from 15 to 8 */}
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

      {/* Wave container — 4 pure CSS elements, no JS */}
      <div className={styles.waveContainer}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>

      {/* Gradient orbs — 4 pure CSS elements, no JS */}
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
