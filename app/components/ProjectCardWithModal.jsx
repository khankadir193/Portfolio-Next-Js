'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ProjectCardComponent } from '../SectionComponents';
import { TechTag } from '../SectionComponents';
import styles from './ProjectCardWithModal.module.css';

function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const previousFocusRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    const focusable = overlayRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) {
      focusable.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, [handleKeyDown]);

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.modalHeader}>
          <span className={styles.modalIcon}>📁</span>
          <h3 className={styles.modalTitle}>{project.title}</h3>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.modalDescription}>{project.description}</p>

          <div className={styles.modalDivider} />

          <div className={styles.modalTechSection}>
            <h4 className={styles.modalSectionTitle}>Technologies</h4>
            <div className={styles.modalTechList}>
              {project.technologies.map((tech, idx) => (
                <TechTag key={idx} label={tech} variant="filled" />
              ))}
            </div>
          </div>

          {project.link && project.link !== '#' && (
            <div className={styles.modalLinkWrapper}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalLink}
              >
                View Live Project →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCardWithModal({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <ProjectCardComponent
        {...project}
        onReadMore={openModal}
      />
      {isOpen && (
        <ProjectModal
          project={project}
          onClose={closeModal}
        />
      )}
    </>
  );
}
