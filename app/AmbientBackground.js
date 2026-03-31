'use client';

import React, { useState, useEffect } from 'react';
import styles from './AmbientBackground.module.css';

const AmbientBackground = () => {
  const [particles, setParticles] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    // Generate random particle data only on client side
    const particleData = Array.from({ length: 60 }, (_, i) => {
      const types = ['circle', 'square', 'triangle', 'star'];
      const colors = [
        'rgba(56, 189, 248, 0.4)',
        'rgba(6, 182, 212, 0.3)',
        'rgba(139, 92, 246, 0.3)',
        'rgba(236, 72, 153, 0.3)',
        'rgba(34, 197, 94, 0.3)',
        'rgba(251, 191, 36, 0.3)'
      ];

      let size = 'small';
      if (i % 4 === 0) size = 'medium';
      if (i % 8 === 0) size = 'large';
      if (i % 12 === 0) size = 'xlarge';

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 25}s`,
        animationDuration: `${20 + Math.random() * 15}s`,
        size,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        direction: Math.random() > 0.5 ? 'up' : 'down',
      };
    });
    setParticles(particleData);

    // Generate sparkle effects
    const sparkleData = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      size: Math.random() > 0.7 ? 'large' : 'small',
    }));
    setSparkles(sparkleData);

    // Generate geometric shapes
    const shapeData = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`,
      rotation: `${Math.random() * 360}deg`,
      type: Math.random() > 0.5 ? 'hexagon' : 'diamond',
    }));
    setShapes(shapeData);
  }, []);

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